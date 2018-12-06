'use strict'

let config = {}

// test CI
// process.env.GITLAB_CI = true;

if (process.env.GITLAB_CI) {
  const { GITLAB_USER_NAME } = process.env

  config.get = () => {
    return {
      autoOpenChrome: false,
      port: 3000,
      user: GITLAB_USER_NAME || ''
    }
  }
} else {
  config = require('legoflow-config')
}

exports.set = (name, value) => {
  config.set(name, value)

  global.print.success(`set ${name}: ${value}`)
}

exports.get = (name) => {
  return config.get(name) || ''
}

exports.clean = (name, value) => {
  config.clean()

  global.print.success('clean finish')
}
