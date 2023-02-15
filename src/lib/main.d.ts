// define type for MultiVideoPlayer class
type MultiVideoPlayer = {
  options: MultiVideoPlayerOptions,
  $container: Element | null,
  videoPlayers: Array<VideoPlayer>,
  addVideos(videos: Array<VideoPlayerOptions> | undefined): void,
  addVideo(video: VideoPlayerOptions): void,
}

type VideoPlayerOptions = {
  src: string,
  area: string,
  controls?: boolean,
}

type MultiVideoPlayerOptions = {
  videos?: Array<VideoOptions>,
  area: string
  template?: string,
  controls?: boolean,
}
