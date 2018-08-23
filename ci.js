#!/usr/bin/env node

'use strict'

console.log('Enter CI')

global.print = require('./core/print')
global.util = require('legoflow-engine/util')

const workflow = require('./core/workflow')
const { version } = require('./package.json')

const env = process.argv[ 2 ]

env && console.log(`Env: ${env}`)

console.log(`CI Version: ${version}`)

workflow('build', env, {}, 'ci')
