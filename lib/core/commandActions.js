const { promisify } = require('util')
const path = require('path')

const ora = require('ora')
const fse = require('fs-extra')
const download = promisify(require('download-git-repo'))

const { vueRepo, reactRepo } = require('../config/repo')
const { command } = require('../utils/shell')
const { renderTemplate, write2File } = require('../utils/renderTemp')

const spinner = ora({
  color: "green",
  spinner: "star"
})


const createProject = async (project) => {
  try {
    spinner.start('下载模块中...')
    // error: 判断是否存在重名文件夹  会报 128 错误
    // 下载 repo template 
    await download(vueRepo, project, { clone: true })
    // install package
    const npmenv = process.platform === 'win32' ? 'npm.cmd' : 'npm'
    spinner.start('installing packages...')
    await command(npmenv, ['install'], { cwd: `./${project}` })
    // 启动 open vue-cli-service serve --open  打开浏览器
    spinner.succeed('finished install packages')
    await command(npmenv, ['run', 'serve'], { cwd: `./${project}` })
    
  } catch (error) {
    console.error(error)
  }

}

const createReactProject = async (project) => {
  try {
    spinner.start('下载模块中...')
    await download(reactRepo, project, { clone: true })
    // install package
    const npmenv = process.platform === 'win32' ? 'npm.cmd' : 'npm'
    spinner.start('installing packages...')
    await command(npmenv, ['install'], { cwd: `./${project}` })
    spinner.succeed('finished install packages')
    // 启动 open vue-cli-service serve --open  打开浏览器
    await command(npmenv, ['run', 'start'], { cwd: `./${project}` })
  } catch (error) {
    console.error(error)
  }

}

const addComponent = async (name, dest) => {
  spinner.start('start~')
  // 生成ejs模块
  const data = { name }
  const res = await renderTemplate('component-vue.ejs', data)

  const url = path.resolve(dest, `${name}.vue`)
  await write2File(url, res)
  // 添加到对应的文件夹中
  spinner.succeed('组件已经生成~')
}

const addPage = async (name, dest) => {
  spinner.start('start~')
  // 生成ejs模块
  const data = { name }
  const compres = await renderTemplate('component-vue.ejs', data)
  const routeres = await renderTemplate('router-vue.ejs', data)
  const dir = path.resolve(dest, `${name}/`)
  fse.ensureDirSync(path.resolve(dest, `${name}/`))
  const pageurl = path.resolve(dir, `${name}.vue`)
  const routerurl = path.resolve(dir, `router.js`)
  await write2File(pageurl, compres)
  await write2File(routerurl, routeres)
  // 添加到对应的文件夹中
  spinner.succeed('页面与路由已经生成~')
}

module.exports = {
  createProject,
  addComponent,
  addPage,
  createReactProject
}