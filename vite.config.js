import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Component from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [

    Component({
      extensions: ['vue'],
      dirs: ['src/pages', 'src/components'],
      deep: true,
      dts: 'components.d.ts',
    }),

    vue(),
  ],
})
