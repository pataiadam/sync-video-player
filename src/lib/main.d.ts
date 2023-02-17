// define type for MultiVideoPlayer class
import VideoPlayer from "./video/VideoPlayer";

type MultiVideoPlayer = {
  options: MultiVideoPlayerOptions,
  $container: Element | null,
  videoPlayers: Array<VideoPlayer>,
  mount(): void,
  addVideoPlayers(videos: Array<VideoPlayerOptions> | undefined): void,
  addVideoPlayer(video: VideoPlayerOptions): void,
  changeState(state: PlayerState, videoPlayer?: VideoPlayer): void;
  timeTo(seconds: number): void;
  onTimeUpdate(videoPlayer: VideoPlayer, time: number): void;
  play(): Promise<void>;
  onReady(): void;
}

type VideoPlayerOptions = {
  id: string,
  controls?: boolean,
  initialSrc: string,
  startSeconds?: number,
  main?: boolean,
}

type MultiVideoPlayerOptions = {
  videoPlayers?: Array<VideoPlayerOptions>,
  videos?: Array<VideoOptions>,
  area?: string
  template?: string,
  controls?: boolean,
  loop?: boolean,
}

type PlayerState = string;
