<template>
  <div>
    <div id="multi-video-player"></div>

    <br>

    <div>
      Debug: <br>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import MultiVideoPlayer from './lib';

onMounted(() => {
    const multiVideoPlayer = new MultiVideoPlayer({
        videos: [
            {
                src: 'https://static.videezy.com/system/resources/previews/000/050/817/original/002822-HD-SPECTRUM-COUNTDOWN-01.mp4',
            },
            {
                src: 'https://static.videezy.com/system/resources/previews/000/051/313/original/002823-HD-SPECTRUM-COUNTDOWN-02.mp4',
            },
            {
                src: 'https://static.videezy.com/system/resources/previews/000/049/943/original/002831-HD-COUNTDOWN-03.mp4',
            },
            {
                src: 'https://static.videezy.com/system/resources/previews/000/004/294/original/18_20Dragon_20Coaster_20Part_202.mp4',
            },
        ],
        area: '#multi-video-player',
    });
    console.log(multiVideoPlayer.$container);
});

</script>

<style scoped>

</style>
