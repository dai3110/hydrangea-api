import React from 'react'
import RootLayout from '~/views/components/layout/root'

const AuthLayout = (props: {
  script?: string
  user?: string | null | undefined
  heading?: string
  children: React.ReactNode
}) => {
  const jsName = props.script?.split(',').map((s) => s.trim()) ?? []
  return (
    <RootLayout script={props.script}>
      <main className="auth-panel">
        <section>
          {props.heading && (
            <header>
              <h1>{props.heading}</h1>
            </header>
          )}
          {props.children}
        </section>
      </main>
    </RootLayout>
  )
}

export default AuthLayout
