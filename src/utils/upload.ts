import { Request } from 'express'
import multer from 'multer'

export const uploadAcceptor = (...mimes: string[]) => multer({
  storage: multer.diskStorage({
    destination(
      req: Request,
      file: Express.Multer.File,
      callback: (error: Error | null, destination: string) => void
    ) {
      callback(null, '/tmp')
    },
    filename(
      req: Request,
      file: Express.Multer.File,
      callback: (error: Error | null, destination: string) => void
    ) {
      const uniqueSuffix = Math.random().toString(26).substring(4, 10)
      callback(null, `${Date.now()}-${uniqueSuffix}-${file.originalname.toLowerCase()}`)
    }
  }),
  fileFilter(req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) {
    if (mimes.includes(file.mimetype)) {
      callback(null, true)
      return
    }
    callback(new TypeError('Invalid File Type'))
  }
})
