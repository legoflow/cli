'use strict'

const chalk = require('chalk')
const ora = require('ora')
const prompt = require('inquirer').prompt
const legoflowProject = require('legoflow-project')
const getConfig = require('./local_config').get

const { version: cVersion } = require('../package.json')

module.exports = async function (options) {
  typeof options.name === 'function' && (options.name = undefined)
  typeof options.type === 'function' && (options.type = undefined)
  typeof options.version === 'function' && (options.version = undefined)
  typeof options.description === 'function' && (options.description = undefined)
  typeof options.isSourcePath === 'function' && (options.isSourcePath = undefined)

  if (options.name && !options.type) {
    global.print.error('缺少 type 配置')
    process.exit(1)
  }

  if (!options.name && options.type) {
    global.print.error('缺少 name 配置')
    process.exit(1)
  }

  let projectTypes = { }

  let spinner = void 0

  if (!options.name && !options.type && getConfig('loadNPMLegoFlowTemplate')) {
    spinner = ora('正在获取 LegoFlow NPM 模板').start()
  }

  projectTypes = await legoflowProject.getProjectType()

  spinner && spinner.stop()

  const types = Object.keys(projectTypes)

  if (options.type && types.indexOf(options.type) < 0) {
    global.print.error('找不到该项目类型')
    process.exit(1)
  }

  const toSpace = (str) => {
    return str + (Array(str.length < 8 ? 8 - str.length + 1 || 0 : 0).join(' '))
  }

  types.forEach((item, index) => {
    switch (item) {
      case 'Vue.js': {
        types[ index ] = {
          name: `${chalk.bold(toSpace(item))}${chalk.whiteBright('- Vue.js 项目基础模板')}`,
          value: item
        }
        break
      }
      case 'Vue.ts': {
        types[ index ] = {
          name: `${chalk.bold(toSpace(item))}${chalk.whiteBright('- Vue.js 项目 TypeScript 模板')}`,
          value: item
        }
        break
      }
      case 'PC': {
        types[ index ] = {
          name: `${chalk.bold(toSpace(item))}${chalk.whiteBright('- PC 端项目模板')}`,
          value: item
        }
        break
      }
      case 'Mobile': {
        types[ index ] = {
          name: `${chalk.bold(toSpace(item))}${chalk.whiteBright('- 移动端项目模板')}`,
          value: item
        }
        break
      }
    }
  })

  let questions = [
    {
      type: 'input',
      name: 'name',
      message: '项目名称',
      default: '',
      validate (input) {
        const done = this.async()

        !input ? done('项目名称不能为空') : done(null, true)
      }
    },
    {
      type: 'list',
      name: 'type',
      message: '项目类型',
      choices: types,
      default: 0
    },
    {
      type: 'input',
      name: 'version',
      message: '版本号',
      default: '0.0.1'
    },
    {
      type: 'input',
      name: 'description',
      message: '项目描述',
      default: ''
    },
    {
      type: 'list',
      name: 'isSourcePath',
      message: '是否作为源路径',
      choices: [ { name: 'no', value: false }, { name: 'yes', value: true } ],
      default: 0
    }
  ]

  let name = options.name || ''
  let type = options.type || ''
  let version = options.version || '0.0.1'
  let description = options.description || ''
  let isSourcePath = options.isSourcePath == 'true' || false

  if (!options.name && !options.type) {
    const answers = await prompt(questions)
    name = answers.name
    type = answers.type
    version = answers.version
    description = answers.description
    isSourcePath = answers.isSourcePath
  }

  const newProjectOptions = {
    path: process.cwd(),
    name,
    type,
    version,
    isSourcePath,
    author: getConfig('user'),
    c_version: `cli@${cVersion}`,
    description,
    typeSourcePath: projectTypes[ type ],
    from: 'cli'
  }

  const result = await legoflowProject.new(newProjectOptions)

  result && result.newProjectSuccessMessage && console.log(result.newProjectSuccessMessage)

  typeof result !== 'string' ? global.print.success('新建成功') : global.print.error(result)
}
