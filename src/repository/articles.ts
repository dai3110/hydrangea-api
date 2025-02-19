import { prisma } from '~/utils/database'

export const articleData = {
  async addArticles(
    articles: {
      image: string
      date?: Date
      title?: string
      explain?: string
    }[]
  ) {
    return await prisma.article
      .createMany({
        data: articles
      })
      .then((res) => true)
      .catch((res) => false)
  },
  async getArticle() {
    return await prisma.article.findMany()
  }
}
