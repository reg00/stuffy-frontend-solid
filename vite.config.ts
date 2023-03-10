import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
  plugins: [
    // devtools({
    //   autoname: true,
    //   locator: {
    //     targetIDE: 'vscode',
    //     componentLocation: true,
    //     jsxLocation: true,
    //   },
    // }),
    solidPlugin(),
  ],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://194.67.110.244:7777',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    target: 'esnext',
  },
})
