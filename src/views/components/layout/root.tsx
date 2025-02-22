import React from 'react'

const RootLayout = (props: {
  script?: string
  children: React.ReactNode
}) => {
  const jsName = props.script?.split(',').map((s) => s.trim()) ?? []
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="stylesheet" href="/assets/app.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        {jsName.map((name, index) => (
          <script key={index} src={`/assets/js/${name}.js`}></script>
        ))}
      </head>
      <body>{props.children}</body>
    </html>
  )
}

export default RootLayout
