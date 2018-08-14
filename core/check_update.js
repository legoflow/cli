'use strict'

const axios = require('axios')
const chalk = require('chalk')
const boxen = require('boxen')
const semver = require('semver')

let { version: nowVersion } = require('../package.json')

module.exports = async () => {
  try {
    let { version } = (await axios('https://raw.githubusercontent.com/legoflow/legoflow-cli/master/package.json', { timeout: 5000 })).data

    if (semver.gt(version, nowVersion) > 0) {
      console.log(
        boxen(
          chalk.yellow(`Update available ${nowVersion} → ${chalk.bold.yellow.underline(version)}\nRun ${chalk.bold.green('npm i -g legoflow-cli')} to update\nRecommend use ${chalk.bold.green('yarn global add legoflow-cli')}\nView Changelog ${chalk.bold.yellow.underline('https://git.io/fNQgF')}`),
          {
            padding: { left: 1, right: 1 },
            borderStyle: 'double',
            borderColor: 'yellow'
          }
        )
      )
    }
  } catch (e) {
    if (e.toString().indexOf('timeout') > 0) {
      console.error('[CHECK UPDATE ERROR]', 'timeout of 5000ms exceeded')
    } else {
      console.error('[CHECK UPDATE ERROR]', e)
    }
  }
}
