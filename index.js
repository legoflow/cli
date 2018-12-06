#!/usr/bin/env node

'use strict'

const program = require('commander')
const chalk = require('chalk')

global.print = require('./core/print')

const checkUpdate = require('./core/check-update')
const workflow = require('./core/workflow')
const killPort = require('./core/kill-port')
const localConfig = require('./core/local-config')

const { version } = require('./package.json')

global.util = require('legoflow-engine/util');

(async () => {
  program
    .version(version)
    .option('-v, --version', 'output the version number')
    .description(`${chalk.blue.bold('LegoFlow-CLI')}, ${chalk.underline('https://legoflow.com')}`)

  program
    .command('init')
    .option('--name <name>')
    .option('--type <type>')
    .option('--description <description>')
    .option('--isSourcePath <isSourcePath>')
    .option('--git <git>')
    .description('init new project')
    .action(require('./core/init-project'))

  program
    .command('init:type')
    .description('get init project type')
    .action(require('./core/init-project-type'))

  program
    .command('set <name> <value>')
    .description('set config <name> <value>')
    .action(localConfig.set)

  program
    .command('get <name>')
    .description('get config <name>')
    .action(localConfig.get)

  program
    .command('clean')
    .description('clean config')
    .action(localConfig.clean)

  program
    .command('path')
    .description('install path')
    .action(() => console.log(__dirname))

  program
    .command('migrate:v2')
    .description('migrate project to v2')
    .action(require('./core/migrate-v2'))

  program
    .command('kill:port <port>')
    .description('kill thread by port')
    .action(killPort)

  program
    .command('check:update')
    .description('check update')
    .action(checkUpdate)

  program
    .command('dev [env]')
    .option('-e, --env', 'env list')
    .description(chalk.yellow('run dev workflow in project'))
    .action(
      (env, cmd) => {
        checkUpdate().then(() => workflow('dev', env, cmd))
      }
    )

  program
    .command('build [env]')
    .option('-e, --env', 'env list')
    .description(chalk.yellow('run build workflow in project'))
    .action(
      (env, cmd) => {
        checkUpdate().then(() => workflow('build', env, cmd))
      }
    )

  program
    .command('build:dll')
    .description(chalk.yellow('run build dll'))
    .action(
      (cmd) => {
        checkUpdate().then(() => workflow('dll', void 0, cmd))
      }
    )

  program.on('command:*', function () {
    console.log(chalk.yellow(`! Command not found. Please try to use ${chalk.yellow.bold('-h')}`))
    process.exit(1)
  })

  program.parse(process.argv)
})()
