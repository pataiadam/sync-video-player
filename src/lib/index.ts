import VideoPlayer from './video/VideoPlayer';

class MultiVideoPlayer {
    public options: MultiVideoPlayerOptions;
    public $container: Element | null;
    public videos: Array<VideoPlayer> = [];

    constructor(options: MultiVideoPlayerOptions) {
        this.options = {
            area: options.area,
            videos: options.videos || [],
            template: '<div id="multi_video_player_container"></div>'
        };

        this.$container = null;

        this.videos = [];

        this.mount();
    }

    private mount() {
        this.render();
        this.addVideos(this.options.videos!);
    }

    private render() {
        const { template, area } = this.options;
        if (!area) {
            return console.error('area is required in options');
        }
        const areaEl = document.querySelector(area);
        if (!areaEl) {
            return console.error('area not found: ', area);
        }
        areaEl.innerHTML = template!;
        this.$container = document.querySelector('#multi_video_player_container');
    }

    public addVideos(videos: Array<string>) {
        videos.forEach(video => {
            this.addVideo(video);
        });
    }

    public addVideo(video: string) {
    // TODO: check video is valid
        const videoInstance = new VideoPlayer(this, video);
        this.videos.push(videoInstance);
    }
}

export default MultiVideoPlayer;
