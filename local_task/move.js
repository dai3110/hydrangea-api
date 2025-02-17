const fs = require('fs')
const nodepath = require('path')
const buildPath = nodepath.resolve(__dirname, '../dist')
const distSrcPath = nodepath.resolve(buildPath, 'src')
const distTmpPath = nodepath.resolve(buildPath, 'tmp')

const copyDir = (src, dest) => {
  fs.mkdirSync(dest, { recursive: true })
  const files = fs.readdirSync(src, { withFileTypes: true })
  files.forEach((file) => {
    const srcPath = nodepath.resolve(src, file.name)
    const destPath = nodepath.resolve(dest, file.name)

    if (file.isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  })
}

fs.existsSync(distSrcPath) && (copyDir(distSrcPath, buildPath), fs.rmdirSync(distSrcPath, { recursive: true }))
!fs.existsSync(distTmpPath) &&  fs.mkdirSync(distTmpPath)
