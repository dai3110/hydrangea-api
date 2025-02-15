const fs = require('fs')
const glob = require('glob')
const sass = require('dart-sass')
const path = require('path')

const sassFilePath = path.resolve(__dirname, '../src/public/assets')
const distPath = path.resolve(__dirname, '../dist/public/assets')
glob.globSync(path.resolve(sassFilePath, '*.scss')).forEach((filePath) => {
  const res = sass.renderSync({
    file: filePath
  })
  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath, { recursive: true })
  }
  fs.writeFileSync(
    path.resolve(distPath, `${filePath.slice(sassFilePath.length + 1, -'.scss'.length)}.css`),
    res.css.toString(),
    'utf-8'
  )
})
