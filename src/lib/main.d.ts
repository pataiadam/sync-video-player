// define type for MultiVideoPlayer class
type MultiVideoPlayer = {
  options: MultiVideoPlayerOptions,
  $container: Element | null,
  videoPlayers: Array<VideoPlayer>,
  mount(): void,
  addVideoPlayers(videos: Array<VideoPlayerOptions> | undefined): void,
  addVideoPlayer(video: VideoPlayerOptions): void,
}

type VideoPlayerOptions = {
  id: string,
  controls?: boolean,
  initialSrc: string,
}

type MultiVideoPlayerOptions = {
  videoPlayers?: Array<VideoPlayerOptions>,
  videos?: Array<VideoOptions>,
  area?: string
  template?: string,
  controls?: boolean,
}

type PlayerState = number;
