'use strict'

const legoflowProject = require('legoflow-project')

module.exports = async function () {
  console.log(Object.keys(await legoflowProject.getProjectType()))
}
