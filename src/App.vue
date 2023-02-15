
<script setup lang="ts">
import { onMounted } from 'vue';

import MultiVideoPlayer from './lib';

onMounted(() => {
  const multiVideoPlayer = new MultiVideoPlayer({
    area: '#multi-video-player',
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
  console.log(multiVideoPlayer.$container);
});

</script>

<template>
  <div>

    1 <br>
    <div id="video-one"></div>

    2 <br>
    <div id="video-two" style="width: 400px"></div>

    3 <br>
    <div id="video-three"></div>

    mvp<br>
    <div id="multi-video-player"></div>

    <div>
      Debug: <br>
    </div>
  </div>
</template>


<style scoped>

</style>
