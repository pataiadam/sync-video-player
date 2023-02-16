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
      videoPlayers: options.videoPlayers || [],
      template: '<div id="multi_video_player_container"></div>'
    };

    this.$container = null;

    this.videoPlayers = [];
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
    await Promise.all(this.videoPlayers.map(async video => {
      await video.play();
    }));
  }

  public async pause() {
    await Promise.all(this.videoPlayers.map(async video => {
      await video.pause();
    }));
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
