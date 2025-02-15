const fs = require('fs')
const path = require('path')
const rootPath = path.resolve(__dirname, '../')
const envfilePath = path.resolve(rootPath, '.env')

const envContent = fs.readFileSync(envfilePath).toString()
const rewriteContent =
  envContent
    ?.split('\n')
    .map((line) => {
      if (line.startsWith('#') || !line.includes('=')) {
        return line
      }
      const [key, ...value] = line.split('=')
      return `${key}=${isNaN(Number(value.join(''))) ? 'string' : 'number'}(${value.join('').length})`
    })
    .join('\n') ?? ''

fs.writeFileSync(path.resolve(rootPath, '.env.format'), rewriteContent, 'utf-8')
