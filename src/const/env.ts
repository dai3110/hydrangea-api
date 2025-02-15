import 'dotenv/config'

export const env = {
  cognitoRegion: process.env['COGNITO_REGION'] as string,
  cognitoUserpoolId: process.env['COGNITO_USERPOOL_ID'] as string,
  cognitoClientId: process.env['COGNITO_CLIENT_ID'] as string,
  cognitoClientSecret: process.env['COGNITO_CLIENT_SECRET'] as string
} as const
