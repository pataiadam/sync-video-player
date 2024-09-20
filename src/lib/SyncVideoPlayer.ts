import {PlayerState} from './constants';
import {MultiVideoPlayerOptions, VideoPlayerOptions} from './main';
import {Logger} from './utils';
import VideoPlayer from './video/VideoPlayer';

const validStates = {
  [PlayerState.LOADING]: [PlayerState.LOADED],
  [PlayerState.LOADED]: [PlayerState.PLAYING],
  [PlayerState.PLAYING]: [PlayerState.PAUSE, PlayerState.ENDED],
  [PlayerState.PAUSE]: [PlayerState.PLAYING, PlayerState.ENDED],
  [PlayerState.ENDED]: [PlayerState.PLAYING],

  [PlayerState.BUFFERING]: [],
  [PlayerState.UNSTARTED]: [],
};

const isValidState = (currentState: PlayerState, nextState: PlayerState) => {
  const stateOuts: Array<PlayerState> = validStates[currentState];
  if (!stateOuts) {
    return false;
  }

  return stateOuts.includes(nextState);
};


class SyncVideoPlayer {
  public options: MultiVideoPlayerOptions;
  public $container: Element | null;
  public videoPlayers: Array<VideoPlayer> = [];
  private readyCount: number;
  private state: PlayerState;
  private currentTime: number;

  constructor(options: MultiVideoPlayerOptions) {
    this.options = {
      controls: options.controls ?? true,
      loop: options.loop ?? false,
      area: options.area || '',
      videoPlayers: options.videoPlayers || [],
      template: '<div id="sync_video_player_container"></div>'
    };

    this.state = PlayerState.LOADING;
    this.readyCount = 0;

    this.$container = null;

    this.videoPlayers = [];
    this.currentTime = 0;
  }

  public mount() {
    this.render();
    this.addVideoPlayers(this.options.videoPlayers);
  }

  private render() {
    const { template, area } = this.options;
    if (!area) {
      return;
    }
    const areaEl = document.querySelector(area);
    if (!areaEl) {
      return Logger.error('area not found: ', area);
    }

    areaEl.innerHTML = template || '';
    this.$container = document.querySelector('#sync_video_player_container');
  }

  public async changeState(state: PlayerState, videoPlayer: VideoPlayer) {
    if (state === PlayerState.BUFFERING) {
      // TODO: find out how to handle buffering
      return;
    }
    if (state === PlayerState.PLAYING) {
      return this.play();
    }
    if (state === PlayerState.PAUSE) {
      if (videoPlayer.isEnded()) {
        return;
      }
      return this.pause();
    }
    if (state === PlayerState.ENDED) {
      // the main video player is the only one that can end if main is set
      const mainVideoPlayer = this.videoPlayers.find((vp) => {
        return vp.main;
      });
      if (mainVideoPlayer && mainVideoPlayer !== videoPlayer) {
        return;
      }

      await this.moveStateTo(PlayerState.ENDED, () => {
        if (this.options.loop) {
          this.timeTo(0);
        }
      });
    }
    if (state === PlayerState.UNSTARTED) {
      if (this.state === PlayerState.ENDED) {
        if (this.options.loop) {
          await this.play();
        }
      }
    }
  }

  private async moveStateTo(state: PlayerState, success?: (newState: PlayerState, oldState: PlayerState) => void, fail?: (newState: PlayerState, oldState: PlayerState) => void) {
    if (isValidState(this.state, state)) {
      const oldState = this.state;
      this.state = state;
      if (success) {
        await success(this.state, oldState);
      }
      Logger.debug('state changed to: ', state);
    } else {
      if (fail) {
        await fail(this.state, state);
      }
      Logger.error('invalid state change: ', this.state, state);
    }
  }

  public async onReady() {
    this.readyCount++;
    if (this.readyCount !== this.videoPlayers.length) return;
    await this.moveStateTo(PlayerState.LOADED);
  }

  public onTimeUpdate(videoPlayer: VideoPlayer, time: number) {
    const diff = Math.abs(this.currentTime - time);
    if (diff > 0.5) {
      this.timeTo(time);
    }
    this.currentTime = time;
    this.fixVideoStates();
  }

  private fixVideoStates() {
    const mainVideoPlayer = this.videoPlayers.find((vp) => {
      return vp.main;
    });

    if (!mainVideoPlayer) return;
    this.videoPlayers.forEach(vp => {
      if (vp === mainVideoPlayer) return;
      if (vp.isEnded()) return;
      if(mainVideoPlayer.isPlaying && !vp.isPlaying) {
        vp.play().catch(() => {
          // noop
        });
      }
      if(!mainVideoPlayer.isPlaying && vp.isPlaying) {
        vp.pause().catch(() => {
          // noop
        });
      }
    });
  }

  /**
   * ------------------------------
   * Public methods
   * ------------------------------
   */

  public addVideoPlayers(videoPlayers: Array<VideoPlayerOptions> | undefined) {
    if (!videoPlayers) return;
    videoPlayers.forEach(videoPlayer => {
      this.addVideoPlayer(videoPlayer);
    });
  }

  public addVideoPlayer(videoPlayer: VideoPlayerOptions) {
    const videoInstance = new VideoPlayer(this, videoPlayer);
    if (!videoInstance.videoElement) return;
    this.videoPlayers.push(videoInstance);

    // FIXME: this is a hack to make sure the video is set to the correct time when added to the player
    const timeTo = (i = 0) => {
      if (i >= 50) return;
      if (Math.abs(this.currentTime - videoInstance.getCurrentTime()) > 0.1) {
        videoInstance.timeTo(this.currentTime);
        setTimeout(() => timeTo(++i), 0);
      }
    };
    timeTo();
  }

  public async play() {
    await this.moveStateTo(PlayerState.PLAYING, async () => {
      this.timeTo(this.currentTime);
      await Promise.all(this.videoPlayers.map(async video => {
        if (this.currentTime < video.getPlayLength()) {
          await video.play();
        }
      }));
    });
  }

  public async pause() {
    await this.moveStateTo(PlayerState.PAUSE, async () => {
      await Promise.all(this.videoPlayers.map(async video => {
        await video.pause();
      }));
    });
  }

  public async stop() {
    await this.moveStateTo(PlayerState.PAUSE, async () => {
      await Promise.all(this.videoPlayers.map(async video => {
        await video.stop();
      }));
    });
  }

  public timeTo(time: number) {
    this.currentTime = time;
    this.videoPlayers.forEach(video => {
      video.timeTo(time);
    });
  }

  public swapVideo(index1: number, index2: number) {
    if (index1 === index2) return;
    this.videoPlayers[index1]._swap(this.videoPlayers[index2]);
    const tmp = this.videoPlayers[index1];
    this.videoPlayers[index1] = this.videoPlayers[index2];
    this.videoPlayers[index2] = tmp;
  }
}

export default SyncVideoPlayer;
