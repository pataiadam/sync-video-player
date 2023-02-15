class VideoPlayer {
  public video: VideoPlayerOptions;
  private player: MultiVideoPlayer;
  private readonly controls: boolean;
  constructor(player: MultiVideoPlayer, video: VideoPlayerOptions) {
    this.player = player;
    this.video = video;
    this.controls = this.video.controls ?? player.options.controls ?? true;
    this.mount();
  }

  private mount() {
    this.render();
  }

  private render() {
    const html = `
        <video src="${this.video.src}" ${this.controls ? 'controls' : ''} style="width: 100%;height: 100%"></video>
    `;
    const area = document.querySelector(this.video.area);
    if (!area) {
      return console.error('area not found: ', this.video.area);
    }
    area.innerHTML = html;
  }
}

export default VideoPlayer;
