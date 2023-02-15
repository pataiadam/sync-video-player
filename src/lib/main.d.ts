// define type for MultiVideoPlayer class
type MultiVideoPlayer = {
  options: MultiVideoPlayerOptions,
  $container: Element | null,
  videos: Array<VideoPlayer>,
  addVideos: (videos: Array<string>) => void,
  addVideo: (video: string) => void,
}

type MultiVideoPlayerOptions = {
  videos?: Array<string>,
  area: string
  template?: string,
}

type VideoPlayerOptions = {
  videoId?: string,
}
