<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useArticlesStore } from '../stores/articles'
import TableOfContents from '@/components/TableOfContents.vue'
import { formatMarkdown } from '@/utils/markdown'
import type { HeadingItem } from '@/utils/markdown'

const route = useRoute()
const router = useRouter()
const articlesStore = useArticlesStore()

const articleId = computed(() => parseInt(route.params.id as string))

const article = computed(() => {
  return articlesStore.getArticleById(articleId.value)
})

const articleBody = ref('');
const headings = ref<HeadingItem[]>([]);

const goBack = () => {
  router.back()
}

const goHome = () => {
  router.push({ name: 'Home' })
}

const renderArticle = async () => {
  if (article.value) {
    articlesStore.incrementViews(articleId.value)
    const result = await formatMarkdown(article.value.content || '');
    articleBody.value = result.html;
    headings.value = result.headings;
  }
}

onMounted(() => {
  renderArticle()
})

watch(() => articleId.value, () => {
  renderArticle()
})
</script>

<template>
  <div class="article-container" v-if="article">
    <article class="article-content-wrapper">
      <div class="article-header-section">
        <h1 class="article-title">{{ article.title }}</h1>
        <div class="article-info">
          <span class="info-item">
            <span class="icon">👤</span>
            {{ article.author }}
          </span>
          <span class="info-item">
            <span class="icon">📅</span>
            {{ article.date }}
          </span>
          <span class="info-item" v-if="article.updatedDate && article.updatedDate !== article.date">
            <span class="icon">✏️</span>
            更新于 {{ article.updatedDate }}
          </span>
          <span class="info-item">
            <span class="icon">👁️</span>
            {{ article.views }} 次浏览
          </span>
        </div>
        <div class="article-tags">
          <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </div>

      <div class="article-body" v-html="articleBody"></div>
    </article>

    <TableOfContents :headings="headings" />
  </div>
  <div v-else class="not-found">
    <div class="not-found-content">
      <div class="not-found-icon">📄</div>
      <h1>文章未找到</h1>
      <button class="btn-primary" @click="goHome">返回首页</button>
    </div>
  </div>
</template>

<style scoped>
.article-container {
  min-height: 100vh;
  /* padding: 0 20px; */
  display: grid;
  grid-template-columns: 1fr 240px;
  /* gap: 28px; */
  /* align-items: start; */
  gap: 8px;
}

.nav-btn {
  background: rgba(10, 25, 47, 0.7);
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: #667eea;
  transition: all 0.2s;
}

.nav-btn:hover {
  transform: translateX(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.article-content-wrapper {
  width: 100%;
  /* margin: 0 0 40px 0; */
  /* background: rgba(10, 25, 47, 0.7); */
  /* border: 1px solid rgba(0, 242, 255, 0.2); */
  border-left: 1px solid rgba(0, 242, 255, 0.2);
  border-right: 1px solid rgba(0, 242, 255, 0.2);
  /* border-radius: 12px; */
  padding: 40px;
}

.article-header-section {
  margin-bottom: 40px;
  padding-bottom: 30px;
  border-bottom: 1px solid rgba(0, 242, 255, 0.2);
}

.article-title {
  margin: 0 0 16px 0;
  font-size: 36px;
  font-weight: 700;
  color: #dbeafe;
  line-height: 1.3;
}

.article-info {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  font-size: 14px;
  color: #a8d4ff;
  margin: 16px 0;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.icon {
  font-size: 16px;
}

.article-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 16px;
}

.tag {
  display: inline-block;
  background: rgba(62, 86, 165, 0.5);
  color: #7d96b9;
  padding: 6px 14px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
}

.article-body {
  font-size: 16px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.7);
}

.article-body :deep(h1) {
  font-size: 28px;
  font-weight: 700;
  color: #dbeafe;
  margin: 32px 0 16px;
  line-height: 1.3;
}

.article-body :deep(h2) {
  font-size: 24px;
  font-weight: 600;
  color: #dbeafe;
  margin: 24px 0 12px;
  line-height: 1.3;
}

.article-body :deep(h3) {
  font-size: 20px;
  font-weight: 600;
  color: #a8d4ff;
  margin: 20px 0 10px;
}

.article-body :deep(h4) {
  font-size: 18px;
  font-weight: 600;
  color: #a8d4ff;
  margin: 16px 0 8px;
}

.article-body :deep(p) {
  margin: 16px 0;
  line-height: 1.8;
}

.article-body :deep(strong),
.article-body :deep(b) {
  font-weight: 600;
  color: #dbeafe;
}

.article-body :deep(em),
.article-body :deep(i) {
  font-style: italic;
}

.article-body :deep(code) {
  /* background: #f3f4f6; */
  background: #1f2937;
  color: #d97706;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
}

.article-body :deep(pre) {
  background: #1f2937;
  color: #e5e7eb;
  padding: 16px;
  border-radius: 6px;
  overflow-x: auto;
  margin: 16px 0;
  line-height: 1.5;
}

.article-body :deep(pre code) {
  background: none;
  color: inherit;
  padding: 0;
  border-radius: 0;
  font-size: 14px;
}

.article-body :deep(a) {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  border-bottom: 1px solid #667eea;
  transition: all 0.2s;
}

.article-body :deep(a:hover) {
  color: #764ba2;
  border-bottom-color: #764ba2;
}

.article-body :deep(ul),
.article-body :deep(ol) {
  margin: 16px 0;
  padding-left: 32px;
  line-height: 1.8;
}

.article-body :deep(li) {
  margin: 8px 0;
}

.article-body :deep(blockquote) {
  border-left: 4px solid #667eea;
  padding-left: 16px;
  margin: 16px 0;
  color: rgba(255, 255, 255, 0.6);
  font-style: italic;
}

.article-body :deep(hr) {
  border: none;
  border-top: 1px solid rgba(0, 242, 255, 0.2);
  margin: 24px 0;
}

.article-body :deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin: 16px 0;
  font-size: 14px;
}

.article-body :deep(th),
.article-body :deep(td) {
  border: 1px solid rgba(0, 242, 255, 0.2);
  padding: 12px;
  text-align: left;
}

.article-body :deep(th) {
  background: rgba(102, 126, 234, 0.1);
  font-weight: 600;
  color: #dbeafe;
}

.article-body :deep(tbody tr:hover) {
  background: rgba(102, 126, 234, 0.05);
}

.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.not-found-content {
  text-align: center;
  background: rgba(10, 25, 47, 0.7);
  border: 1px solid rgba(0, 242, 255, 0.2);
  padding: 60px 40px;
  border-radius: 12px;
  box-shadow: 0 0 30px rgba(0, 242, 255, 0.15);
}

.not-found-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.not-found-content h1 {
  margin: 0 0 20px 0;
  font-size: 28px;
  color: #dbeafe;
}

.btn-primary {
  background: #667eea;
  color: white;
  border: none;
  padding: 12px 32px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover {
  background: #764ba2;
}

.article-container :deep(.smart-toc) {
  position: sticky;
  align-self: self-start;
  top: 58px;
}

@media (max-width: 900px) {
  .article-container {
    grid-template-columns: 1fr;
  }

  .article-container .smart-toc {
    display: none;
  }

  .article-content-wrapper {
    padding: 24px;
  }

  .article-title {
    font-size: 24px;
  }

  .article-info {
    gap: 12px;
    font-size: 12px;
  }

  .article-body {
    font-size: 15px;
    line-height: 1.6;
  }

  .article-body h1 {
    font-size: 22px;
  }

  .article-body h2 {
    font-size: 20px;
  }
}
</style>
