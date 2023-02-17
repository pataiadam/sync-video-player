# 🔁 SyncVideoPlayer

SyncVideoPlayer is an npm package that allows you to easily play multiple HTML videos at the same time and have them stay in sync. It provides features such as looping and controls, and automatically keeps videos in sync. It works with all major browsers and is free and open source.

## ⭐️ Highlights

- Easy to use and set up 🚀
- Can loop and control videos 🔁
- Automatically keeps videos in sync 🤝
- Compatible with all major browsers 🌐
- Free and open source 🆓

## 🚀 Installation

To get started, install SyncVideoPlayer from npm:

```
npm install sync-video-player
```

## 🧑‍🚀 Usage

Once installed, you can use SyncVideoPlayer in your project like this:

```jsx
const syncVideoPlayer = new SyncVideoPlayer({
  controls: false,
  loop: true,
  videoPlayers: [
    {
      id: '#video-0',
      controls: true,
      main: true,
      initialSrc: '<https://static.videezy.com/system/resources/previews/000/050/817/original/002822-HD-SPECTRUM-COUNTDOWN-01.mp4>',
    },
    {
      id: '#video-1',
      startSeconds: 10,
      initialSrc: '<https://static.videezy.com/system/resources/previews/000/051/313/original/002823-HD-SPECTRUM-COUNTDOWN-02.mp4>',
    },
    {
      id: '#video-2',
      initialSrc: '<https://static.videezy.com/system/resources/previews/000/049/943/original/002831-HD-COUNTDOWN-03.mp4>',
    }
  ],
});

//    Once you're ready, just mount it using 
syncVideoPlayer.mount() 
//    to start playing the videos.
```

## 🧩 Parameters

SyncVideoPlayer exposes the following parameters to customize the video player:

| Name | Description |
| --- | --- |
| controls | Whether or not to show video controls |
| loop | Whether or not to loop the video |
| videoPlayers | An array of video players, each with an id, startSeconds, controls, main, and initialSrc |

Parameters for objects of `videoPlayers`:

| Parameter | Description |
| --- | --- |
| videoPlayers.id | The id of the HTML element to render the video player |
| videoPlayers.startSeconds | The starting position in the video (in seconds) |
| videoPlayers.initialSrc | The initial source of the video |
| videoPlayers.main |  specify which video should be the main video (all other videos will sync to it) |
| videoPlayers.controls | Whether or not to show the video controls. Default true. This will override the global settings |

## 🔧 Available Methods

SyncVideoPlayer provides the following methods to control the player:

- `mount()`: Mounts the video player and starts playing the videos.
- `addVideoPlayers(videoPlayers)`: Adds multiple video players to the player.
- `addVideoPlayer(videoPlayer)`: Adds a single video player to the player.
- `timeTo(seconds)`: Sets the time of all players to the given seconds.
- `play()`: Starts playing the videos.
- `pause()`: Pauses the videos.

## 🔥 Contributing

We welcome contributions to the SyncVideoPlayer project! If you'd like to help out, please check out our [Contributing Guidelines](notion://www.notion.so/pataiadam/CONTRIBUTING.md) for more information.

### 💖 Thanks

We'd like to thank all of our contributors for their hard work and dedication to this project. Your help has made SyncVideoPlayer a success and we appreciate it!

We'd also like to thank the [SplitPlayer](https://github.com/fluse/SplitPlayer) project for providing inspiration for this project.
