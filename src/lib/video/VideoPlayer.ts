import {PlayerState} from '../constants';

class VideoPlayer {
  public videoId: string;
  public videoPlayerConfig: VideoPlayerOptions;
  private player: MultiVideoPlayer;
  public controls: boolean;
  public videoPlayerArea: Element | null;
  public videoElement: HTMLVideoElement | null;
  public videoState: PlayerState;
  private readonly _startSeconds: number;
  private readonly loop: boolean;
  constructor(player: MultiVideoPlayer, videoPlayerConfig: VideoPlayerOptions) {
    this.videoId = Math.random().toString(36).substring(2, 15);
    this.player = player;
    this.videoPlayerConfig = videoPlayerConfig;
    this.controls = this.videoPlayerConfig.controls ?? player.options.controls ?? true;
    this.loop = player.options.loop ?? false;

    this._startSeconds = parseFloat(String(this.videoPlayerConfig.startSeconds ?? 0));

    this.videoPlayerArea = null;
    this.videoElement = null;
    this.videoState = PlayerState.LOADING;

    this.mount();
  }

  private mount() {
    this.render();
    this.videoElement = document.querySelector(`#video_player_${this.videoId}`);

    if (!this.videoElement) {
      return console.debug('video element not found');
    }

    this.setupVideoElement({ controls: this.controls });

    this.videoElement.addEventListener('loadeddata', this.onReady.bind(this), false);
    this.videoElement.addEventListener('canplaythrough', this.onStateChange.bind(this, PlayerState.UNSTARTED), false);
    this.videoElement.addEventListener('play', this.onStateChange.bind(this, PlayerState.PLAYING), false);
    this.videoElement.addEventListener('pause', this.onStateChange.bind(this, PlayerState.PAUSE), false);
    this.videoElement.addEventListener('seeking', this.onSeeking.bind(this), false);
    this.videoElement.addEventListener('timeupdate', this.onTimeUpdate.bind(this), false);

    this.videoElement.addEventListener('ended', this.onStateChange.bind(this, PlayerState.ENDED), false);
    this.videoElement.addEventListener('waiting', this.onStateChange.bind(this, PlayerState.BUFFERING), false);
  }

  private onReady() {
    console.log(this.videoId, '::[onReady]');
    this.timeTo(0);
  }

  private onSeeking() {
    this.player.onTimeUpdate(this, this.getPlayedTime());
  }

  private onTimeUpdate() {
    this.player.onTimeUpdate(this, this.getPlayedTime());
  }

  private onStateChange(state: PlayerState) {
    console.log(this.videoId, '::[onStateChange]', state);
    this.videoState = state;

    const statesToPropagate = [
      PlayerState.BUFFERING,
      PlayerState.PLAYING,
      PlayerState.PAUSE,
    ];

    if (statesToPropagate.includes(state)) {
      this.player.changeState(state);
    }

    if (state === PlayerState.ENDED && this.loop) {
      this.player.timeTo(0);
    }
  }

  private render() {
    // if video area is defined, add video to area
    this.videoPlayerArea = document.querySelector(this.videoPlayerConfig.id);
    if (!this.videoPlayerArea) {
      return console.debug('id not found: ', this.videoPlayerConfig.id);
    }
    this.videoPlayerArea.innerHTML = `
        <video 
            id="video_player_${this.videoId}"
            src="${this.videoPlayerConfig.initialSrc}"
            style="width:fit-content;height:inherit;"
        >
        </video>
    `;
  }

  private setupVideoElement(options: { controls: boolean }) {
    this.setControls(options.controls);
  }

  public _swap(videoPlayer: VideoPlayer) {
    if (!this.videoElement || !videoPlayer.videoElement) return;
    const nodeA = this.videoElement;
    const nodeB = videoPlayer.videoElement;
    const parentA = nodeA.parentNode;
    const parentB = nodeB.parentNode;

    if (!parentA || !parentB) throw new Error('Parent node not found');

    const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;
    parentB.insertBefore(nodeA, nodeB);
    parentA.insertBefore(nodeB, siblingA);

    const thisControls = this.controls;
    this.setupVideoElement({ controls: videoPlayer.controls });
    videoPlayer.setupVideoElement({ controls: thisControls });
  }

  /**
   * -------------------------------
   * PUBLIC METHODS FOR VIDEO PLAYER
   * -------------------------------
   */

  public async play() {
    if (!this.videoElement) return;
    await this.videoElement.play();
  }

  public async pause() {
    if (!this.videoElement) return;
    await this.videoElement.pause();
  }

  public stop() {
    if (!this.videoElement) return;
    this.videoElement.pause();
    this.timeTo(0);
  }

  public setControls(controls: boolean) {
    if (!this.videoElement) return;
    this.videoElement.controls = controls;
    this.controls = controls;
  }

  public timeTo(time: number) {
    if (!this.videoElement) return;
    time = parseFloat(time.toString());
    time = (time + this._startSeconds);

    if (time >= this.getDuration()) {
      this.stop();
      return console.debug('timeTo: time is greater than duration');
    }

    this.videoElement.currentTime = time;
  }

  public getDuration() {
    return (this.videoElement?.duration || 0);
  }

  public getPlayedTime() {
    const time = (this.videoElement?.currentTime || 0) - this._startSeconds;
    return Math.max(time, 0);
  }
}

export default VideoPlayer;
