import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Article } from '../types/article'

export const useArticlesStore = defineStore('articles', () => {
  const articles = ref<Article[]>([]);

  const initArticle = () => {
    const blog = import.meta.glob('../blog/*.md', { eager: true }) as Record<string, { frontmatter: any, content: string }>;
    articles.value = Object.values(blog).map((post, index) => {
      return {
        id: index,
        ...post.frontmatter,
        content: post.content,
        views: 0,
      } satisfies Article
    })
    console.log(blog);
  };

  const addArticle = (article: Omit<Article, 'id' | 'views'>) => {
    const newArticle: Article = {
      ...article,
      id: Math.max(...articles.value.map(a => a.id), 0) + 1,
      views: 0
    }
    articles.value.unshift(newArticle)
    return newArticle
  }

  const updateArticle = (id: number, updates: Partial<Article>) => {
    const index = articles.value.findIndex(a => a.id === id)
    if (index !== -1) {
      articles.value[index] = {
        ...articles.value[index],
        ...updates,
        updatedDate: new Date().toISOString().split('T')[0]
      } as Article
    }
  }

  const deleteArticle = (id: number) => {
    const index = articles.value.findIndex(a => a.id === id)
    if (index !== -1) {
      articles.value.splice(index, 1)
    }
  }

  const getArticleById = (id: number) => {
    return articles.value.find(a => a.id === id)
  }

  const incrementViews = (id: number) => {
    const article = articles.value.find(a => a.id === id)
    if (article) {
      article.views++
    }
  }

  return {
    articles,
    initArticle,
    addArticle,
    updateArticle,
    deleteArticle,
    getArticleById,
    incrementViews
  }
})
