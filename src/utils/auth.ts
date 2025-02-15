import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider';
import { Request, Response } from "express";
import { env } from '~/const/env';
import { createHmac } from 'crypto'

const cognito = new CognitoIdentityProvider({ region: env.cognitoRegion })
const clientId = env.cognitoClientId

const generateSecretHash = (username: string) => {
  const hasher = createHmac('sha256', env.cognitoClientSecret);
  hasher.update(`${username}${clientId}`);
  return hasher.digest('base64');
}

export const sessionToken = {
  set(res: Response, token: string) {
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
    });
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
      .then((res) => (res.AuthenticationResult?.AccessToken))
      .catch((e) => null)
  },
  logout(res: Response) {
    sessionToken.clear(res)
  },
  async currentUser(req: Request, res: Response) {
    const token = sessionToken.get(req)
    if (!token) {
      return null
    }
    return await cognito.getUser({ AccessToken: token }).catch((e) => {
      sessionToken.clear(res)
      return null
    })
  }
}
