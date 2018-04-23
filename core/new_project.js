'use strict';

const project = require('legoflow-project');
const prompt = require('inquirer').prompt;
const newProject = require('legoflow-project');
const getProjectType = require('legoflow-project/getProjectType');

const { version: c_version } = require('../package.json');

module.exports = async function ( ) {
    const types = Object.keys( getProjectType( ) );

    const questions = [
        {
            type: 'input',
            name: 'name',
            message: '项目名称',
            default: '',
        },
        {
            type: 'list',
            name: 'type',
            message: '项目类型',
            choices: types,
            default: 0,
        },
        {
            type: 'input',
            name: 'version',
            message: '版本号',
            default: '0.0.1',
        },
        {
            type: 'list',
            name: 'isESNext',
            message: '是否使用 ES.Next',
            choices: [ { name: 'yes', value: true }, { name: 'no', value: false } ],
            default: 0,
        },
        {
            type: 'list',
            name: 'isSourcePath',
            message: '是否作为源路径',
            choices: [ { name: 'no', value: false }, { name: 'yes', value: true } ],
            default: 0,
        },
    ];

    const { name, type, version, isESNext, isSourcePath } = await prompt( questions );

    const options = {
        path: process.cwd( ),
        name, type, version, isESNext, isSourcePath,
        author: '',
        c_version: `cli@${ c_version }`,
    }

    const result = await newProject( options );

    typeof result !== 'string'  ? print.success( '新建成功' ) : print.error( result );
};
