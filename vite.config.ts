import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { PluginOption } from 'vite'

import matter from 'gray-matter'

function markdownPlugin(): PluginOption {
  return {
    name: 'markdown-plugin',
    transform(code, id) {
      if (id.endsWith('.md')) {
        const markdown = matter(code);
        return `export const frontmatter = ${JSON.stringify(markdown.data)};
                export const content = ${JSON.stringify(markdown.content)};`;
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    markdownPlugin(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
