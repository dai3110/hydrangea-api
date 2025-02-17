import 'dotenv/config'

export const env = {
  cognitoRegion: process.env['COGNITO_REGION'] as string,
  cognitoUserpoolId: process.env['COGNITO_USERPOOL_ID'] as string,
  cognitoClientId: process.env['COGNITO_CLIENT_ID'] as string,
  cognitoClientSecret: process.env['COGNITO_CLIENT_SECRET'] as string,
  s3Region: process.env['S3_REGION'] as string
} as const

export const dbtable = {
  app: process.env['TABLE_APP_DATA'] as string,
  article: process.env['TABLE_ARTICLE_DATA'] as string
}

export const bucket = {
  photo: process.env['S3_PHOTO_BUCKET'] as string
}
