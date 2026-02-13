<script setup lang="ts">
import type { Article } from '../types/article'
import { useRouter } from 'vue-router'

defineProps<{
  article: Article
}>()

const router = useRouter()

const handleClick = (id: number) => {
  router.push({ name: 'ArticleDetail', params: { id } })
}
</script>

<template>
  <article class="article-preview" @click="handleClick(article.id)">
    <div class="article-header">
      <h2 class="article-title">{{ article.title }}</h2>
      <span class="category-badge">{{ article.category }}</span>
    </div>

    <p class="article-summary">{{ article.summary }}</p>

    <div class="article-meta">
      <span class="meta-item">
        <span class="icon">👤</span>
        {{ article.author }}
      </span>
      <span class="meta-item">
        <span class="icon">📅</span>
        {{ article.date }}
      </span>
      <span class="meta-item">
        <span class="icon">👁️</span>
        {{ article.views }}
      </span>
    </div>

    <div class="article-tags">
      <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
    </div>
  </article>
</template>

<style scoped>
.article-preview {
  background: rgba(10, 25, 47, 0.7);
  border: 1px solid rgba(0, 242, 255, 0.2);
  /* backdrop-filter: blur(10px); */
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.article-preview:hover {
  transform: translateY(-5px);
  border-color: rgba(0, 242, 255, 0.6);
  box-shadow: 0 0 20px rgba(0, 242, 255, 0.2);
}

.article-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
}

.article-title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #dbeafe;
  flex: 1;
  line-height: 1.4;
}

.category-badge {
  display: inline-block;
  background: #67c6fd;
  color: #1e40af;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  flex-shrink: 0;
}

.article-summary {
  margin: 12px 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-meta {
  display: flex;
  gap: 20px;
  margin: 16px 0;
  font-size: 13px;
  color: #9ca3af;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.icon {
  font-size: 14px;
}

.article-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 12px;
}

.tag {
  display: inline-block;
  background: rgba(62, 86, 165, 0.5);
  color: #7d96b9;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

@media (max-width: 768px) {
  .article-preview {
    padding: 16px;
  }

  .article-title {
    font-size: 18px;
  }

  .article-meta {
    gap: 12px;
    font-size: 12px;
  }
}
</style>
