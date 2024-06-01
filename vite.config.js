import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Component from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Component({
      resolvers: [PrimeVueResolver()],
      extensions: ['vue'],
      dirs: ['src/pages', 'src/components'],
      deep: true,
      dts: 'components.d.ts',
    }),

    vue(),
  ],
  resolve: {
    alias: {
      '@': '/src',
      'src/*': '/src/*',
      'app/*': '/../',
      'components/*': '/src/components/*',
      'layouts/*': '/src/layouts/*',
      'pages/*': '/src/pages/*',
      'assets/*': '/src/assets/*',
      'boot/*': '/src/boot/*',
      'stores/*': '/src/stores/*',
    },
  },
})
