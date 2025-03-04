import { appData } from '~/repository/app';
import { Request, Response } from 'express'
import { articleData } from '~/repository/articles'
import { PageRouting } from '~/types/app'

export default {
  async get(req: Request, res: Response) {
    const articles = await articleData.getArticles({ draft: false, pub: true })
    res.send({
      version: await appData.currentPublishVersion(),
      articles: articles.posts.map((article) => ({
        id: article.id,
        title: article.title,
        image: article.image,
        date: article.date,
        explain: article.explain,
        lat: article.lat,
        lng: article.lng
      }))
    })
  }
} as PageRouting
