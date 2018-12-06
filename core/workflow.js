'use strict'

const prompt = require('inquirer').prompt
const chalk = require('chalk')

const buildConfig = require('./build-config')

module.exports = async (flag = 'build', env = '', cmd = { }, from = 'cli') => {
  const config = await buildConfig(flag)

  if (!config) {
    console.error('找不到配置文件')

    return void 0
  }

  if (env && config.env) {
    if (!config.env[ env ]) {
      global.print.error(`env<${env}> undefined.`)

      return void 0
    } else {
      config[ `workflow.${flag}` ].env = env
    }
  } else if (!env && cmd.env && config.env && Object.keys(config.env).length > 0) {
    const questions = [
      {
        type: 'list',
        name: 'chooseEnv',
        message: `请选择${flag == 'dev' ? '开发' : '构建'}环境`,
        choices: Object.keys(config.env),
        default: 0
      }
    ]

    const { chooseEnv } = await prompt(questions)

    config[ `workflow.${flag}` ].env = chooseEnv
  }

  const workflowConfig = config[ `workflow.${flag}` ] || { }

  console.log(`Launching ${chalk.bold(`workflow.${flag}`)}${workflowConfig && workflowConfig.env ? `, env: ${chalk.bold.underline(workflowConfig.env)}` : ''}`)

  typeof config.friendlyErrors === 'undefined' && (config.friendlyErrors = true)

  config.from = from

  const Messager = require('legoflow-engine/messager')

  const { sender } = Messager

  Messager.sender = ({ type, msg }) => {
    if (type === 'success') {
      global.print.success(flag === 'dev' ? (config.mode === 'webpack' ? `http://${msg.ip}:${msg.bsPort}` : 'started dev service') : 'build finish')
    } else {
      sender({ type, msg })
    }

    if (type === 'stop') {
      process.exit(1)
    }
  }

  require(`legoflow-engine/${flag}`)(config)
}
