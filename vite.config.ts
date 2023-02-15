import {resolve} from 'path'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'MultiVideoPlayer',
      fileName: (format) => `multi-video-player.${format}.js`,
      formats: ['es', 'umd']
    }
  }
})
