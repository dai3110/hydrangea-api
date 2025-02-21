import React from 'react'
import { pathResolved } from '~/utils/app'
import RootLayout from '~/views/components/layout/root'

const Page = (props: {
  input?: {
    user?: string
    returnpath?: string
  }
  error?: string
}) => (
  <RootLayout>
    {props.error && <div>{props.error}</div>}
    <form action={pathResolved('/admin/login')} method="POST">
      <dl>
        <div>
          <dt>name</dt>
          <dd>
            <input type="text" name="user" value={props.input?.user} />
          </dd>
        </div>
        <div>
          <dt>password</dt>
          <dd>
            <input type="password" name="password" />
          </dd>
        </div>
      </dl>
      <div>
        <input type="hidden" name="returnpath" value={props.input?.returnpath} />
        <button type="submit">login</button>
      </div>
    </form>
  </RootLayout>
)

export default Page
