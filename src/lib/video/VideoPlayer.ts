import {PlayerState} from '../constants';

class VideoPlayer {
  public videoId: string;
  public videoPlayerConfig: VideoPlayerOptions;
  private player: MultiVideoPlayer;
  public controls: boolean;
  public videoPlayerArea: Element | null;
  public videoElement: HTMLVideoElement | null;
  public videoState: PlayerState;
  constructor(player: MultiVideoPlayer, videoPlayerConfig: VideoPlayerOptions) {
    this.videoId = Math.random().toString(36).substring(2, 15);
    this.player = player;
    this.videoPlayerConfig = videoPlayerConfig;
    this.controls = this.videoPlayerConfig.controls ?? player.options.controls ?? true;

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

    this.videoElement.addEventListener('ended', this.onStateChange.bind(this, PlayerState.ENDED), false);
    this.videoElement.addEventListener('waiting', this.onStateChange.bind(this, PlayerState.BUFFERING), false);
  }

  private onReady() {
    console.log(this.videoId, '::[onReady]');
  }

  private onStateChange(state: PlayerState) {
    console.log(this.videoId, '::[onStateChange]', state);
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

  public setControls(controls: boolean) {
    if (!this.videoElement) return;
    this.videoElement.controls = controls;
    this.controls = controls;
  }
}

export default VideoPlayer;
