import React from 'react'
import RootLayout from '~/views/components/layout/root'

const Page = (props: {
  input?: {
    user?: string
  }
  error?: string
}) => (
  <RootLayout>
    {props.error && <div>{props.error}</div>}
    <form action="/admin/login" method="POST">
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
        <button type="submit">login</button>
      </div>
    </form>
  </RootLayout>
)

export default Page
