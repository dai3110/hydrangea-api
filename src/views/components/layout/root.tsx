import React from 'react'

const RootLayout = (props: { children: React.ReactNode }) => (
  <html lang="ja">
    <head>
      <meta charSet="utf-8" />
      <link rel="stylesheet" href="/assets/app.css" />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    </head>
    <body>
      <header>
        <div>
        <span className="material-icons">image_search</span>
        </div>
      </header>
      <main>{props.children}</main>
    </body>
  </html>
)

export default RootLayout
