'use strict'

const { kill } = require('cross-port-killer')

module.exports = (port) => {
  kill(port).then((pids) => {
    global.print.success(`killed thread:${port}`)
  })
}
