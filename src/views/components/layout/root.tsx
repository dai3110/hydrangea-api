import React from 'react'

const RootLayout = (props: { children: React.ReactNode }) => (
  <html lang="ja">
    <head>
      <meta charSet="utf-8" />
      <link rel="stylesheet" href="/assets/app.css" />
    </head>
    <body>
      <main>{props.children}</main>
    </body>
  </html>
)

export default RootLayout
