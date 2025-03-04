import { Request, Response } from 'express';
import { appData } from '~/repository/app';
import { PageRouting } from '~/types/app';

export default {
  async get(req: Request, res: Response) {
    res.send({
      content: await appData.currentPublishVersion()
    })
  }
} as PageRouting
