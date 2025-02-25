import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider'
import { createHmac } from 'crypto'
import { NextFunction, Request, Response } from 'express'
import { env } from '~/const/env'
import { RequestHandler } from '~/types/app'
import { RoleDefine } from '~/types/auth'

const cognito = new CognitoIdentityProvider({ region: env.cognitoRegion })
const clientId = env.cognitoClientId

const generateSecretHash = (username: string) => {
  const hasher = createHmac('sha256', env.cognitoClientSecret)
  hasher.update(`${username}${clientId}`)
  return hasher.digest('base64')
}

export const sessionToken = {
  set(res: Response, token: string) {
    res.cookie('token', token, {
      httpOnly: true,
      secure: true
    })
  },
  get(req: Request) {
    return req.cookies['token']
  },
  clear(res: Response) {
    res.clearCookie('token')
  }
}

export const auth = {
  async login(username: string, password: string) {
    return await cognito
      .initiateAuth({
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: clientId,
        AuthParameters: {
          USERNAME: username,
          PASSWORD: password,
          SECRET_HASH: generateSecretHash(username)
        }
      })
      .then((res) => res.AuthenticationResult?.AccessToken)
      .catch((e) => null)
  },
  logout(res: Response) {
    sessionToken.clear(res)
  },
  async currentUser(req: Request, res: Response) {
    const token = sessionToken.get(req)
    if (!token) {
      req.session.user = null
      req.session.save()
      return null
    }
    const user = await cognito.getUser({ AccessToken: token }).catch((e) => {
      sessionToken.clear(res)
      return null
    })
    req.session.user = user?.Username
    req.session.save()
    return user
  }
}

export const authRequestHandler =
  (roledef: RoleDefine, requestHandler: RequestHandler, failurCallback: RequestHandler) =>
  async (req: Request, res: Response, next?: NextFunction) => {
    type Handler = (req: Request, res: Response, next: NextFunction) => void | Promise<void>
    type NextlessHandler = (req: Request, res: Response) => void | Promise<void>
    const user = await auth.currentUser(req, res)
    const userAttr =
      user?.UserAttributes?.find((attr) => attr.Name === roledef.key)?.Value ?? -1

    if (!roledef.values.includes(Number(userAttr))) {
      next && (await (failurCallback as Handler)(req, res, next))
      !next && (await (failurCallback as NextlessHandler)(req, res))
      return
    }
    next && (await (requestHandler as Handler)(req, res, next))
    !next && (await (requestHandler as NextlessHandler)(req, res))
  }
