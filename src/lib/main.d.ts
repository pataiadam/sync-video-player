// define type for MultiVideoPlayer class
type MultiVideoPlayer = {
  options: MultiVideoPlayerOptions,
  $container: Element | null,
  videoPlayers: Array<VideoPlayer>,
  addVideos(videos: Array<VideoOptions> | undefined): void,
  addVideo(video: VideoOptions): void,
}

type VideoOptions = {
  src: string,
}

type MultiVideoPlayerOptions = {
  videos?: Array<VideoOptions>,
  area: string
  template?: string,
}

type VideoPlayerOptions = {
  videoId?: string,
}
