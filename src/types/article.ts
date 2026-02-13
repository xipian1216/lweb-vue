export interface Article {
  id: number
  title: string
  content: string
  summary: string
  author: string
  date: string
  updatedDate?: string
  category: string
  tags: string[]
  views: number
}
