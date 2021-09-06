const { program } = require('commander')
const inquirer = require('inquirer')

const { createProject, createReactProject , addComponent, addPage } = require('./commandActions')
const { frameWorkTypeList } = require('../utils/promptList')
const createCommands = () => {
  program
    .command('create <project> [params...]')
    .description('download template')
    .action(async (project, params) => {
      const { frameWork } = await inquirer.prompt(frameWorkTypeList)
      if (frameWork === 1) {
        createProject(project)
      } else {
        createReactProject(project)
      }
    })

  program
    .command('addComp <name> [params...]')
    .description('add vue component eg: sky addComp demo -d xxx') // 自定义位置 入口已经注册
    .action((name) => {
      addComponent(name, program.opts().dest || 'src/components')
    })

  program
    .command('addPage <name> [params...]')
    .description('add vue PAGE eg: sky addPage demo -d xxx') // 自定义位置 入口已经注册
    .action((name) => {
      addPage(name, program.opts().dest || 'src/pages')
    })
}


module.exports = createCommands