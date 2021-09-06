const path = require('path')
const fs = require('fs')
const ejs = require('ejs')

const renderTemplate = (fileName, data) => {
  const dir = path.resolve(__dirname, `../templates/${fileName}`)
  return ejs.renderFile(dir, data)
}

const write2File = (url, content) => {
  return fs.promises.writeFile(url, content)
}

module.exports = {
  renderTemplate,
  write2File
}