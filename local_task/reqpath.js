const glob = require('glob')
const path = require('path')
const fs = require('fs')
const distPath = path.resolve(__dirname, '../dist')

glob.globSync(`${distPath}/**/*.js`).forEach((jsPath) => {
  const content =
    fs
      .readFileSync(jsPath)
      .toString()
      ?.split('\n')
      .map((line) =>
        line.replaceAll(
          'require("~/',
          `require("${path.relative(path.dirname(jsPath), distPath) || '.'}/`
        )
      )
      .join('\n') ?? ''
  fs.writeFileSync(jsPath, content, 'utf-8')
})
