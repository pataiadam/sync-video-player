import VideoPlayer from './video/VideoPlayer';

class MultiVideoPlayer {
  public options: MultiVideoPlayerOptions;
  public $container: Element | null;
  public videoPlayers: Array<VideoPlayer> = [];

  constructor(options: MultiVideoPlayerOptions) {
    this.options = {
      controls: options.controls ?? true,
      area: options.area || '',
      videos: options.videos || [],
      template: '<div id="multi_video_player_container"></div>'
    };

    this.$container = null;

    this.videoPlayers = [];
  }

  public mount() {
    this.render();
    this.addVideos(this.options.videos);
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

  public addVideos(videos: Array<VideoPlayerOptions> | undefined) {
    if (!videos) return;

    videos.forEach(video => {
      this.addVideo(video);
    });
  }

  public addVideo(video: VideoPlayerOptions) {
    // TODO: check video is valid
    const videoInstance = new VideoPlayer(this, video);
    this.videoPlayers.push(videoInstance);
  }

  public async play() {
    await Promise.all(this.videoPlayers.map(async video => {
      await video.play();
    }));
  }

  public async pause() {
    await Promise.all(this.videoPlayers.map(async video => {
      await video.pause();
    }));
  }
}

export default MultiVideoPlayer;
