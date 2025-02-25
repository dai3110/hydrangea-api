import React from 'react'

const RootLayout = (props: { script?: string; css?: string; children: React.ReactNode }) => {
  const cssName = props.css?.split(',').map((s) => s.trim()) ?? []
  const jsName = props.script?.split(',').map((s) => s.trim()) ?? []
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link rel="stylesheet" href="/assets/css/app.css" />
        {cssName.map((name, index) => (
          <link key={index} rel="stylesheet" href={`/assets/css/${name}.css`} />
        ))}
        {jsName.map((name, index) => (
          <script key={index} src={`/assets/js/${name}.js`}></script>
        ))}
      </head>
      <body>{props.children}</body>
    </html>
  )
}

export default RootLayout
