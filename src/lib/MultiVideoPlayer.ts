import {PlayerState} from './constants';
import VideoPlayer from './video/VideoPlayer';

class MultiVideoPlayer {
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
      videos: options.videos || [],
      videoPlayers: options.videoPlayers || [],
      template: '<div id="multi_video_player_container"></div>'
    };

    this.state = PlayerState.LOADING;
    this.readyCount = 0;

    this.$container = null;

    this.videoPlayers = [];
    this.currentTime = 0;
  }

  public mount() {
    this.render();
    // this.addVideos(this.options.videos);
    this.addVideoPlayers(this.options.videoPlayers);
  }

  private render() {
    const { template, area } = this.options;
    if (!area) {
      return;
    }
    const areaEl = document.querySelector(area);
    if (!areaEl) {
      return console.error('area not found: ', area);
    }

    areaEl.innerHTML = template || '';
    this.$container = document.querySelector('#multi_video_player_container');
  }

  public changeState(state: PlayerState) {
    if (state === PlayerState.BUFFERING) {
      // TODO: find out how to handle buffering
      return;
    }
    if (state === PlayerState.PLAYING) {
      return this.play();
    }
    if (state === PlayerState.PAUSE) {
      return this.pause();
    }
  }

  public onReady() {
    this.readyCount++;
    if (this.readyCount !== this.videoPlayers.length) return;
    this.state = PlayerState.UNSTARTED;
  }

  public onTimeUpdate(videoPlayer: VideoPlayer, time: number) {
    // console.log(videoPlayer.videoId, time);
    // diff
    const diff = Math.abs(this.currentTime - time);
    if (diff > 0.5) {
      console.log('diff', diff);
      this.timeTo(time);
    }
    this.currentTime = time;
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
  }

  public async play() {
    this.timeTo(this.currentTime);
    await Promise.all(this.videoPlayers.map(async video => {
      await video.play();
    }));
  }

  public async pause() {
    await Promise.all(this.videoPlayers.map(async video => {
      await video.pause();
    }));
  }

  public async stop() {
    await Promise.all(this.videoPlayers.map(async video => {
      await video.stop();
    }));
  }

  public timeTo(time: number) {
    this.currentTime = time;
    this.videoPlayers.forEach(video => {
      video.timeTo(time);
    });
  }

  public swapVideo(index1: number, index2: number) {
    if (index1 === index2) return;
    console.log(this.videoPlayers);
    this.videoPlayers[index1]._swap(this.videoPlayers[index2]);
    const tmp = this.videoPlayers[index1];
    this.videoPlayers[index1] = this.videoPlayers[index2];
    this.videoPlayers[index2] = tmp;
  }
}

export default MultiVideoPlayer;
