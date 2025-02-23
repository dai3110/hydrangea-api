const fs = require('fs')
const nodepath = require('path')
const buildPath = nodepath.resolve(__dirname, '../dist')
const distSrcPath = nodepath.resolve(buildPath, 'src')
const distTmpPath = nodepath.resolve(buildPath, 'tmp')
const distPrismaPath = nodepath.resolve(buildPath, 'prisma')
const prismaSchemaFileName = 'schema.prisma'
const prismaSchemaPath = nodepath.resolve(__dirname, '../prisma', prismaSchemaFileName)

const leafletJsFromPath = nodepath.resolve(
  __dirname,
  '../node_modules/leaflet/dist/leaflet.js'
)
const leafletCssFromPath = nodepath.resolve(
  __dirname,
  '../node_modules/leaflet/dist/leaflet.css'
)
const leafletImageFromPath = nodepath.resolve(
  __dirname,
  '../node_modules/leaflet/dist/images'
)
const leafletJsDistPath = nodepath.resolve(buildPath, 'public/assets/js/leaflet.js')
const leafletCssDistPath = nodepath.resolve(buildPath, 'public/assets/css/map.css')
const leafletImageDistPath = nodepath.resolve(buildPath, 'public/assets/css/images')

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

fs.existsSync(distSrcPath) &&
  (copyDir(distSrcPath, buildPath), fs.rmdirSync(distSrcPath, { recursive: true }))
!fs.existsSync(distTmpPath) && fs.mkdirSync(distTmpPath)
!fs.existsSync(distPrismaPath) && fs.mkdirSync(distPrismaPath)
fs.copyFileSync(prismaSchemaPath, nodepath.resolve(distPrismaPath, prismaSchemaFileName))

!fs.existsSync(nodepath.dirname(leafletJsDistPath)) &&
  fs.mkdirSync(nodepath.dirname(leafletJsDistPath))
fs.copyFileSync(leafletJsFromPath, leafletJsDistPath)

!fs.existsSync(nodepath.dirname(leafletCssDistPath)) &&
  fs.mkdirSync(nodepath.dirname(leafletCssDistPath))
fs.copyFileSync(leafletCssFromPath, leafletCssDistPath)

copyDir(leafletImageFromPath, leafletImageDistPath)
