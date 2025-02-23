const glob = require('glob')
const path = require('path')
const fs = require('fs')
const distPath = path.resolve(__dirname, '../dist')

glob.globSync(`${distPath}/**/*.js`).forEach((jsPath) => {
  if (!fs.statSync(jsPath)?.isFile()) {
    return
  }
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

glob.globSync(`${distPath}/public/assets/js/*.js`).forEach((jsPath) => {
  if (!fs.statSync(jsPath)?.isFile()) {
    return
  }
  const content =
    fs
      .readFileSync(jsPath)
      .toString()
      ?.split('\n')
      .map((line) =>
        // expressのtscでのcompilerOptionsの "module": "commonjs" を優先しているため、
        // browser向けのtscでの”ES6"指定せずに該当部分を消す
        line.startsWith('Object.defineProperty') ? '' : line
      )
      .join('\n') ?? ''
  fs.writeFileSync(jsPath, content, 'utf-8')
})
