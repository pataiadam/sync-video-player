
<script setup lang="ts">
import { onMounted } from 'vue';

import MultiVideoPlayer from './lib';

const multiVideoPlayer = new MultiVideoPlayer({
  //area: '#multi-video-player',
  controls: false,
  videos: [
    {
      src: 'https://static.videezy.com/system/resources/previews/000/050/817/original/002822-HD-SPECTRUM-COUNTDOWN-01.mp4',
      area: '#video-one',
    },
    {
      src: 'https://static.videezy.com/system/resources/previews/000/051/313/original/002823-HD-SPECTRUM-COUNTDOWN-02.mp4',
      area: '#video-two',
    },
    {
      src: 'https://static.videezy.com/system/resources/previews/000/049/943/original/002831-HD-COUNTDOWN-03.mp4',
      area: '#video-three',
    },
    {
      src: 'https://static.videezy.com/system/resources/previews/000/004/294/original/18_20Dragon_20Coaster_20Part_202.mp4',
      area: '#video-four',
    },
  ],
});

onMounted(() => {
  multiVideoPlayer.mount();
});

async function onPlay() {
  await multiVideoPlayer.play();
}

async function onPause() {
  await multiVideoPlayer.pause();
}
</script>

<template>
  <div>

    <div class="video-container">
      <div id="video-one" class="video video-big">Big Video</div>
      <div class="small-videos">
        <div id="video-two" class="video video-small">Small Video</div>
        <div id="video-three" class="video video-small">Small Video</div>
        <div id="video-four" class="video video-small">Small Video</div>
      </div>
    </div>

    <div class="controls">
      <button @click="onPlay" >Play</button>
      <button @click="onPause">Pause</button>
    </div>
  </div>
</template>


<style scoped>
.video-container {
  display: flex;
  flex-direction: row;
}

.video {
  margin: 10px;
  display: flex;
  font-size: 24px;
  font-weight: bold;
}

.video-big {
  flex: 0 0 80%;
}

.small-videos {
  display: flex;
  flex-direction: column;
  flex: 0 0 20%;
}

.video-small {
  height: 100px;
  margin: 10px 0;
}
</style>
