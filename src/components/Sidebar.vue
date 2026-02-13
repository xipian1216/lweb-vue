<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useArticlesStore } from '../stores/articles'

const store = useArticlesStore()
const query = ref('')
const route = useRoute()
const sidebarOpen = ref(false)

const activeId = computed(() => {
  const p = route.params.id
  const n = Array.isArray(p) ? Number(p[0]) : Number(p)
  return Number.isNaN(n) ? null : n
})

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return store.articles
  return store.articles.filter(a => {
    return a.title.toLowerCase().includes(q) || a.tags.some(t => t.toLowerCase().includes(q))
  })
})

const isActive = (id: number) => activeId.value === id

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const closeSidebar = () => {
  sidebarOpen.value = false
}
</script>

<template>
  <div class="sidebar-container">
    <!-- 汉堡菜单按钮 -->
    <button class="menu-button" @click="toggleSidebar" :aria-expanded="sidebarOpen">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <!-- 遮罩层 -->
    <div v-if="sidebarOpen" class="sidebar-overlay" @click="closeSidebar"></div>

    <!-- 侧边栏 -->
    <div class="sidebar-root" :class="{ open: sidebarOpen }">
      <div class="search">
        <input v-model="query" placeholder="搜索文档或标签..." />
      </div>

      <nav class="docs-list">
        <h3>文档</h3>
        <ul>
          <li v-for="doc in filtered" :key="doc.id">
            <RouterLink
              :to="{ name: 'ArticleDetail', params: { id: doc.id } }"
              class="doc-link"
              :class="{ active: isActive(doc.id) }"
              @click="closeSidebar"
            >
              <div class="title">{{ doc.title }}</div>
              <div class="meta">{{ doc.category }} · {{ doc.date }}</div>
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.sidebar-container {
  position: relative;
}

.menu-button {
  display: none;
  position: fixed;
  top: 12px;
  left: 12px;
  z-index: 1000;
  width: 40px;
  height: 40px;
  padding: 6px;
  background: rgba(99, 102, 241, 0.2);
  border: 1px solid rgba(99, 102, 241, 0.4);
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
}

.menu-button:hover {
  background: rgba(99, 102, 241, 0.3);
}

.menu-button span {
  width: 24px;
  height: 2px;
  background: #dbeafe;
  border-radius: 1px;
  transition: all 0.3s;
}

.menu-button[aria-expanded="true"] span:nth-child(1) {
  transform: rotate(45deg) translate(9px, 9px);
}

.menu-button[aria-expanded="true"] span:nth-child(2) {
  opacity: 0;
}

.menu-button[aria-expanded="true"] span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}

.sidebar-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.sidebar-root {
  padding: 18px;
  width: 260px;
  overflow: auto;
  max-height: calc(100vh - 56px);
}

.sidebar-root::-webkit-scrollbar {
  width: 8px;
}

.sidebar-root::-webkit-scrollbar-track {
  background: rgba(10, 25, 47, 0.3);
  border-radius: 4px;
}

.sidebar-root::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, rgba(99, 102, 241, 0.6), rgba(14, 165, 233, 0.6));
  border-radius: 4px;
  transition: background 0.2s;
}

.sidebar-root::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, rgba(99, 102, 241, 0.8), rgba(14, 165, 233, 0.8));
}

.search input {
  width: 100%;
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid rgba(0,0,0,0.08);
}

.docs-list h3 {
  margin: 16px 0 8px;
  color: #dbeafe;
}

.docs-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.docs-list li + li {
  margin-top: 10px;
}

.doc-link {
  display: block;
  padding: 10px 12px;
  border-radius: 8px;
  text-decoration: none;
  background: rgba(10, 25, 47, 0.7);
  color: inherit;
  transition: background 0.15s;
}

.doc-link:hover {
  background: rgba(13, 38, 77, 0.85);
}

.title {
  font-weight: 600;
  color: #dbeafe;
}

.meta {
  font-size: 12px;
  color: rgba(219,234,254,0.6);
}

.doc-link.active {
  background: linear-gradient(90deg, rgba(99,102,241,0.12), rgba(14,165,233,0.06));
  border-left: 4px solid rgba(99,102,241,0.9);
  transform: translateX(2px);
}

/* 手机响应式 */
@media (max-width: 768px) {
  .menu-button {
    display: flex;
  }

  .sidebar-overlay {
    display: block;
  }

  .sidebar-root {
    position: fixed;
    top: 56px;
    left: 0;
    width: 260px;
    height: calc(100vh - 56px);
    max-height: calc(100vh - 56px);
    background: #0a1930;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 999;
  }

  .sidebar-root.open {
    transform: translateX(0);
  }
}
</style>
