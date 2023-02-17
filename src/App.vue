
<script setup lang="ts">
import {onMounted, nextTick, ref} from 'vue';

import MultiVideoPlayer from './lib';

const ids = ref( ['video-0', 'video-1', 'video-2']);

const multiVideoPlayer = new MultiVideoPlayer({
  //area: '#multi-video-player',
  controls: false,
  loop: true,
  videoPlayers: [
    {
      id: '#video-0',
      controls: true,
      initialSrc: 'https://static.videezy.com/system/resources/previews/000/050/817/original/002822-HD-SPECTRUM-COUNTDOWN-01.mp4',
    },
    {
      id: '#video-1',
      startSeconds: 10,
      initialSrc: 'https://static.videezy.com/system/resources/previews/000/051/313/original/002823-HD-SPECTRUM-COUNTDOWN-02.mp4',
    },
    {
      id: '#video-2',
      initialSrc: 'https://static.videezy.com/system/resources/previews/000/049/943/original/002831-HD-COUNTDOWN-03.mp4',
    },
    {
      id: '#video-3',
      initialSrc: 'https://static.videezy.com/system/resources/previews/000/004/294/original/18_20Dragon_20Coaster_20Part_202.mp4',
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

function onAdd() {
  // create area for video1
  const id = `video-${Math.random().toString(36).substring(2, 9)}`;
  ids.value.push(id);
  nextTick(() => {
    // add video
    multiVideoPlayer.addVideoPlayer({
      id: `#${id}`,
      initialSrc: 'https://static.videezy.com/system/resources/previews/000/004/294/original/18_20Dragon_20Coaster_20Part_202.mp4',
    });
  });
}

async function onClick(index: number) {
  console.log('onClick', index);
  multiVideoPlayer.swapVideo(0, index);
}

async function onChange(e) {
  const value = e.target.value;
  console.log(value);
  console.log('onChange', value);
  await multiVideoPlayer.timeTo(value);
}
</script>

<template>
  <div>
    <div class="container">
      <div v-for="(id, i) in ids"
           class="box"
           :id="id"
            :key="i"
           @click="onClick(i)">B</div>
    </div>

    <div class="controls">
      <button @click="onAdd" >Add video</button>
      <button @click="onPlay" >Play</button>
      <button @click="onPause">Pause</button>
      <!-- range selector for time -->
      <div class="time">
        <input type="range" min="0" max="100" value="0" class="slider" id="myRange" @input="onChange">
      </div>

    </div>
  </div>
</template>


<style scoped lang="scss">

 .container {
   display: grid;
   grid-template-columns: 1fr 1fr;
   grid-column-gap: 16px;
   grid-row-gap: 16px;
 }

.box {
  min-width: 180px;
  height: 200px;
  padding: 8px;
  font-weight: bold;
  font-size: 17px;
  line-height: 24px;
  border: 1px solid #589BFF;
  border-radius: 12px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

.qqq {
  grid-area: aaa;
};

.www {
  grid-area: bbb;
};

.eee {
  grid-area: ccc;
};

.rrr {
  grid-area: ddd;
};

</style>
