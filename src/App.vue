<script setup lang="ts">
import { RouterView } from 'vue-router'
import ParticlesBackground from './components/ParticlesBackground.vue'
import Navigation from './components/Navigation.vue'
import Sidebar from './components/Sidebar.vue'
import FooterBar from './components/FooterBar.vue'
</script>

<template>
  <div id="app">
    <ParticlesBackground />
    <Navigation />

    <div class="doc-layout">
      <aside class="doc-aside">
        <Sidebar />
      </aside>

      <main class="doc-main">
        <RouterView />
      </main>
    </div>
    <FooterBar />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: linear-gradient(135deg, rgba(19, 27, 32, 0.5) 0%, rgba(50, 60, 148, 0.7) 100%);
  color: #1f2937;
}

#app {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.doc-layout {
  display: grid;
  grid-template-columns: 1fr minmax(0, 5fr);
  padding: 0 40px;
  gap: 8px;
  flex: 1;
}

.doc-aside {
  position: sticky;
  top: 72px;
  align-self: start;
}

.doc-main {
  min-height: 60vh;
  /* padding: 24px; */
}

@media (max-width: 768px) {
  .doc-layout {
    grid-template-columns: 1fr;
  }

  .doc-aside {
    position: static;
    order: 1;
  }

  .doc-main {
    order: 2;
  }
}
</style>
