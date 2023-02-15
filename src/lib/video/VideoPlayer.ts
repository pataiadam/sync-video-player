import {PlayerState} from '../constants';

class VideoPlayer {
  public videoId: string;
  public videoPlayerConfig: VideoPlayerOptions;
  private player: MultiVideoPlayer;
  private readonly controls: boolean;
  private videoElement: HTMLVideoElement | null;
  private videoState: PlayerState;
  constructor(player: MultiVideoPlayer, videoPlayerConfig: VideoPlayerOptions) {
    this.videoId = Math.random().toString(36).substring(2, 15);
    this.player = player;
    this.videoPlayerConfig = videoPlayerConfig;
    this.controls = this.videoPlayerConfig.controls ?? player.options.controls ?? true;

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
    // style width: fit-content;
    //     height: inherit;
    const videoHTML = `
        <video 
            id="video_player_${this.videoId}"
            src="${this.videoPlayerConfig.src}" 
            ${this.controls ? 'controls' : ''} 
            style="width:fit-content;height:inherit;"
        >
        </video>
    `;

    // if video area is not defined, add video to container
    if (!this.videoPlayerConfig.area) {
      if (!this.player.$container) return console.debug('area not found');
      const element = document.createElement('div');
      element.innerHTML = videoHTML;
      this.player.$container.appendChild(element);
      return;
    }

    // if video area is defined, add video to area
    const area = document.querySelector(this.videoPlayerConfig.area);
    if (!area) {
      return console.debug('area not found: ', this.videoPlayerConfig.area);
    }
    area.innerHTML = videoHTML;
  }

  public async play() {
    if (!this.videoElement) return;
    await this.videoElement.play();
  }

  public async pause() {
    if (!this.videoElement) return;
    await this.videoElement.pause();
  }
}

export default VideoPlayer;
