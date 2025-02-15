const fs = require("fs");
const path = require("path");
const prodPath = path.resolve(__dirname, '../product.zip');
const buildPath = path.resolve(__dirname, '../dist');

fs.existsSync(prodPath) && fs.rmSync(prodPath)
fs.existsSync(buildPath) && fs.rmSync(buildPath, { recursive: true })
fs.mkdirSync(buildPath)