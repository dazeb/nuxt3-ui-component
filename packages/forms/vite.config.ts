import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import {resolve} from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    }),
  ],
  esbuild: {
    exclude: ['./src/**/**.stories.ts', './src/**/**.story.vue'],
  },
  build: {
    target: 'esnext',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MorphemeForms',
      formats: ['es', 'cjs', 'iife', 'umd'],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        'vue',
        'vee-validate',
        '@morpheme/button',
        '@morpheme/select',
        '@morpheme/spinner',
        '@morpheme/utils',
        '@morpheme/tailwind-config',
        '@morpheme/icon',
        '@morpheme/progress-bar',
        '@morpheme/switch',
        '@iconify/vue',
        '@vueuse/core',
      ],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
      // resolve: {
      //   dedupe: 'vue',
      // },
    },
  },
});
