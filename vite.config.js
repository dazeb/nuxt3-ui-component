import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import {resolve} from 'path';
import Icons from 'unplugin-icons/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Icons({
      compiler: 'vue3',
      // expiremental
      autoInstall: true,
    }),
  ],
  esbuild: {
    exclude: ['./src/**/**.stories.ts'],
  },
  build: {
    target: 'esnext',
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      name: 'GitsUi',
      formats: ['es'],
    },
    rollupOptions: {
      plugins: [
        {
          name: 'remove-collection-handlers',
          transform(code, id) {
            if (
              id.endsWith('reactivity.esm-bundler.js') ||
              id.endsWith('runtime-core.esm-bundler.js')
            ) {
              return code
                .replace(`mutableCollectionHandlers,`, `null,`)
                .replace(`readonlyCollectionHandlers,`, `null,`);
            }
          },
        },
      ],
    },
  },
  optimizeDeps: {
    include: ['yup', 'fast-deep-equal'],
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    // setupFiles: "./test/unit/setup-test.ts",
    coverage: {
      provider: 'c8',
      reporter: ['text', 'html', 'lcov', 'json'],
    },
    reporters: [
      'json',
      // 'vitest-sonar-reporter'
    ],
    outputFile: {
      json: 'coverage/test-report.json',
      'vitest-sonar-reporter': 'coverage/test-report.xml',
    },
  },
});
