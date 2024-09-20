# 🔄 SyncVideoPlayer

SyncVideoPlayer is an npm package designed to synchronize multiple HTML videos effortlessly. It features looping, controls, and is compatible with all major browsers. Best of all, it's free and open source.

![Example](https://raw.githubusercontent.com/pataiadam/sync-video-player/refs/heads/main/demo.webp)

## ⭐️ Highlights

- Zero dependencies 👜
- Easy to use and set up 🚀
- Can loop and control videos 🔁
- Automatically keeps videos in sync 🤝
- Compatible with all major browsers 🌐

## Installation
Install SyncVideoPlayer via npm:
```bash
npm install sync-video-player
```

## Quick Start
Here's how to quickly set up SyncVideoPlayer:

```html
<html>
<body>
  <video id="video-0" width="300" height="200" controls></video>
  <video id="video-1" width="300" height="200" controls></video>
  <video id="video-2" width="300" height="200" controls></video>
  
  <script src="path/to/sync-video-player.js"></script>
  <script>
    const syncVideoPlayer = new SyncVideoPlayer({
      controls: false,
      loop: true,
      videoPlayers: [
        {
          id: '#video-0',
          controls: true,
          main: true,
          initialSrc: 'https://path/to/video1.mp4'
        },
        {
          id: '#video-1',
          startSeconds: 10,
          initialSrc: 'https://path/to/video2.mp4'
        },
        {
          id: '#video-2',
          initialSrc: 'https://path/to/video3.mp4'
        }
      ]
    });

    syncVideoPlayer.mount();
    
    // Play all videos
    syncVideoPlayer.play();
    
    // Pause all videos
    syncVideoPlayer.pause();
    
    // Set playback time for all videos
    syncVideoPlayer.timeTo(30);
    
    // Add a new video player
    syncVideoPlayer.addVideoPlayer({
      id: '#video-3',
      initialSrc: 'https://path/to/video4.mp4'
    });
  </script>
</body>
</html>
```

## API

### Constructor Options
- `controls` (boolean): Show or hide video controls.
- `loop` (boolean): Enable or disable looping.
- `videoPlayers` (array): List of video configurations.
    - `id`: HTMLElement ID for the video.
    - `startSeconds`: Starting position in seconds.
    - `initialSrc`: Initial video source URL.
    - `main`: Specify which video is the main video (others sync to it).
    - `controls`: Override global controls setting (default: true).

### Methods
- `mount()`: Mounts the video players and starts playback.
- `addVideoPlayers(videoPlayers)`: Add multiple video players.
- `addVideoPlayer(videoPlayer)`: Add a single video player.
- `timeTo(seconds)`: Set playback time for all video players.
- `play()`: Start playback.
- `pause():` Pause playback.

## Contributing
We welcome contributions! Please read our [Contributing Guidelines](notion://www.notion.so/pataiadam/CONTRIBUTING.md) for more information.

## License
SyncVideoPlayer is open-source software licensed under the [MIT License](https://github.com/pataiadam/sync-video-player/blob/main/LICENSE).
