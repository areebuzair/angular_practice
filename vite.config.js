import { defineConfig } from 'vite'
import vitePluginRequire from 'vite-plugin-require';

export default defineConfig({
  base: "/angular_practice/",
  plugins: [
    vitePluginRequire.default(),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,  // <-- ensure old files are removed
  },
})
