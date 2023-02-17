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

```
const multiVideoPlayer = new SyncVideoPlayer({
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

```

## 🧩 Parameters

SyncVideoPlayer exposes the following parameters to customize the video player:

Parameters for objects of `videoPlayers`:

## 🔥 Contributing

We welcome contributions to the SyncVideoPlayer project! If you'd like to help out, please check out our [Contributing Guidelines](notion://www.notion.so/pataiadam/CONTRIBUTING.md) for more information.

### 💖 Thanks

We'd like to thank all of our contributors for their hard work and dedication to this project. Your help has made SyncVideoPlayer a success and we appreciate it!

We'd also like to thank the [SplitPlayer](https://github.com/fluse/SplitPlayer) project for providing inspiration for this project.
