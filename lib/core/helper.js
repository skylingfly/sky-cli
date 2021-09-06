const { program } = require('commander')
const helpOptions = () => {
  program
  .option('-d --dest <dest>', 'destination dir, eg: -d src/compoents')
  .option('-f --framework <framework>', 'choose which fream') //交互可以改成 列表自助选择
}

module.exports = {
  helpOptions
}