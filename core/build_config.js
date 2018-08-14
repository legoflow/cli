'use strict'

const path = require('path')

const localConfig = require('./local_config')

module.exports = async (flag) => {
  const projectPath = process.cwd()

  const root = path.resolve(__dirname, '../')

  const config = projectPath.getConfig({ projectPath, root })

  if (!config) {
    global.print.error('找不到项目配置文件，请检查路径')

    return void 0
  }

  const { autoOpenChrome, port, user } = localConfig.get()

  config.user = user
  config.port = parseInt(port || 3100)
  config.webpackPort = 6700
  config.autoOpenChrome = typeof autoOpenChrome !== 'undefined' ? autoOpenChrome : true

  if (flag === 'dev') {
    config.workflow = 'dev'
  } else if (flag === 'build') {
    config.workflow = 'build'
  }

  return config
}
