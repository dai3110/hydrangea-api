import { postsPerPage } from '~/const/app'
import { prisma } from '~/utils/database'

export const articleData = {
  async addArticle(article: {
    image: string
    date?: Date
    title?: string
    explain?: string
    lat?: number
    lng?: number
  }) {
    const [posts] = await prisma.$transaction([
      prisma.article.create({
        data: article
      })
      // prisma.article
      //   .findUnique({
      //     where: { image:  }
      //   })
    ])
    return posts
  },
  async updateArticle(article: {
    id: number
    image?: string
    date?: Date
    title?: string
    explain?: string
    lat?: number
    lng?: number
    public?: boolean
  }) {
    const res = await prisma.article
      .update({
        where: {
          id: article.id
        },
        data: {
          ...article
        }
      })
      .catch((e) => {
        return null
      })
    return !!res
  },
  async getArticle(id: number) {
    return await prisma.article
      .findUnique({
        where: { id }
      })
      .catch((e) => {
        return null
      })
  },
  async getArticles(cond?: { page?: number; draft?: boolean; pub?: boolean }) {
    const query = {
      where: {
        ...(cond?.draft === true
          ? { title: null }
          : cond?.draft === false
            ? { title: { not: null } }
            : {}),
        ...(cond?.pub === undefined ? {} : { public: cond?.pub })
      },
      ...(cond?.page ? { take: postsPerPage, skip: (cond?.page - 1) * postsPerPage } : {}),
      orderBy: {
        id: 'desc'
      }
    } as const

    const [posts, count] = await prisma.$transaction([
      prisma.article.findMany(query),
      prisma.article.count({ where: query.where })
    ])

    return { posts, count }
  },
  async removeArticle(id: number) {
    return await prisma.article
      .delete({
        where: { id }
      })
      .catch((e) => {
        return null
      })
  }
}
