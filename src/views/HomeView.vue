<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useArticlesStore } from '../stores/articles'
import ArticlePreview from '../components/ArticlePreview.vue'

const articlesStore = useArticlesStore()
const searchQuery = ref('')
const selectedCategory = ref('all')

const categories = computed(() => {
  const cats = new Set(articlesStore.articles.map(a => a.category))
  return ['all', ...Array.from(cats)]
})

const filteredArticles = computed(() => {
  return articlesStore.articles.filter(article => {
    const matchCategory = selectedCategory.value === 'all' || article.category === selectedCategory.value
    const matchSearch = article.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                       article.content.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                       article.tags.some(tag => tag.toLowerCase().includes(searchQuery.value.toLowerCase()))
    return matchCategory && matchSearch
  })
})

const page = ref(1)
const perPage = ref(9)

const totalPages = computed(() => Math.max(1, Math.ceil(filteredArticles.value.length / perPage.value)))
const totalPagesArray = computed(() => Array.from({ length: totalPages.value }, (_, i) => i + 1))

const paginatedArticles = computed(() => {
  const start = (page.value - 1) * perPage.value
  return filteredArticles.value.slice(start, start + perPage.value)
})

watch(filteredArticles, () => { page.value = 1 })
</script>

<template>
  <div class="blog-container">
    <header class="blog-header">
      <h1>文档</h1>
      <p class="tagline">记录与指南 — 快速上手、API 参考、最佳实践</p>
    </header>

    <div class="blog-main">
      <main class="articles-section">
        <div class="docs-grid">
          <ArticlePreview v-for="article in paginatedArticles" :key="article.id" :article="article" />
        </div>

        <div v-if="filteredArticles.length === 0" class="empty-state">
          <div class="empty-icon">📚</div>
          <p>暂无相关文章</p>
        </div>

        <div class="pagination" v-if="totalPages > 1">
          <button class="page-btn" :disabled="page === 1" @click="page = page - 1">上一页</button>

          <div class="pages">
            <button
              v-for="p in totalPagesArray"
              :key="p"
              :class="['page-number', { active: page === p }]"
              @click="page = p"
            >
              {{ p }}
            </button>
          </div>

          <button class="page-btn" :disabled="page === totalPages" @click="page = page + 1">下一页</button>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.blog-container {
  min-height: 100vh;
  padding: 40px 20px;
}

.blog-header {
  text-align: center;
  color: white;
  margin-bottom: 40px;
}

.blog-header h1 {
  margin: 0 0 10px 0;
  font-size: 42px;
  font-weight: 700;
}

.tagline {
  margin: 0;
  font-size: 18px;
  opacity: 0.9;
}

.blog-main {
  max-width: 1200px;
  margin: 0 auto;
  display: block;
  gap: 30px;
}

.docs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.search-widget:hover,
.categories-widget:hover,
.stats-widget:hover {
  border-color: rgba(0, 242, 255, 0.4);
  box-shadow: 0 0 25px rgba(0, 242, 255, 0.15);
}

.search-input {
  width: 100%;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 242, 255, 0.3);
  color: #dbeafe;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.search-input:focus {
  outline: none;
  border-color: rgba(0, 242, 255, 0.6);
  box-shadow: 0 0 12px rgba(0, 242, 255, 0.2);
  background: rgba(255, 255, 255, 0.08);
}

.categories-widget h3,
.stats-widget h3 {
  margin: 0 0 12px 0;
  font-size: 16px;
  color: #dbeafe;
  font-weight: 600;
}

.categories-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.categories-list li {
  margin-bottom: 8px;
}

.category-btn {
  width: 100%;
  padding: 8px 12px;
  background: rgba(62, 86, 165, 0.2);
  border: 1px solid rgba(0, 242, 255, 0.2);
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  color: #a8d4ff;
  text-align: left;
  transition: all 0.2s;
}

.category-btn:hover {
  background: rgba(62, 86, 165, 0.4);
  color: #dbeafe;
  border-color: rgba(0, 242, 255, 0.4);
}

.categories-list li.active .category-btn {
  background: rgba(59, 130, 246, 0.3);
  color: #dbeafe;
  border-color: rgba(0, 242, 255, 0.6);
}

.stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.stat-item {
  padding: 12px;
  background: rgba(62, 86, 165, 0.15);
  border: 1px solid rgba(0, 242, 255, 0.15);
  border-radius: 4px;
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 6px;
}

.stat-value {
  display: block;
  font-size: 20px;
  font-weight: 700;
  color: #00f2ff;
}

.articles-section {
  flex: 1;
}

.articles-list {
  display: flex;
  flex-direction: column;
}

.empty-state {
  background: rgba(10, 25, 47, 0.7);
  border: 1px solid rgba(0, 242, 255, 0.2);
  border-radius: 8px;
  padding: 80px 40px;
  text-align: center;
  box-shadow: 0 0 20px rgba(0, 242, 255, 0.1);
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.empty-state p {
  margin: 0;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.5);
}

@media (max-width: 768px) {
  .blog-container {
    padding: 20px 16px;
  }

  .blog-header h1 {
    font-size: 32px;
  }

  .docs-grid {
    grid-template-columns: 1fr;
  }
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 18px;
}

.page-btn {
  padding: 8px 12px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.06);
  color: #cfe7ff;
  border-radius: 6px;
  cursor: pointer;
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pages {
  display: flex;
  gap: 8px;
}

.page-number {
  padding: 6px 10px;
  background: rgba(255,255,255,0.02);
  color: #a8d4ff;
  border: 1px solid rgba(255,255,255,0.03);
  border-radius: 4px;
  cursor: pointer;
}

.page-number.active {
  background: linear-gradient(90deg, rgba(99,102,241,0.18), rgba(14,165,233,0.12));
  color: white;
  border-color: rgba(99,102,241,0.28);
}

@keyframes moveGrid {
  from { background-position: 0 0, 0 0, 0 0; }
  to { background-position: -320px 0, -320px -320px, -320px -320px; }
}

@keyframes drift {
  0% { transform: translate3d(0,0,0); }
  50% { transform: translate3d(40px,-24px,0); }
  100% { transform: translate3d(0,0,0); }
}
</style>
