import React from 'react'
import { pathResolved } from '~/utils/app'
import AuthLayout from '~/views/components/layout/auth'

const Page = (props: {
  input?: {
    user?: string
    returnpath?: string
  }
  error?: string
}) => (
  <AuthLayout heading="Hydrangea Admin Login">
    <form action={pathResolved('/admin/login')} method="POST" className="login-form">
      <dl>
        <div>
          <dt>name</dt>
          <dd>
            <input type="text" name="user" defaultValue={props.input?.user} />
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
        {props.error && <div className="_message">{props.error}</div>}
        <input type="hidden" name="returnpath" value={props.input?.returnpath} />
        <button type="submit">login</button>
      </div>
    </form>
  </AuthLayout>
)

export default Page
