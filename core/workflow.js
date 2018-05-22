'use strict';

const prompt = require('inquirer').prompt;
const chalk = require('chalk');

const buildConfig = require('./build_config');

module.exports = async ( flag, env, cmd ) => {
    const config = await buildConfig( flag );

    if ( !config ) {
        console.error( '找不到配置文件' );

        return void 0;
    }

    if ( env && config.env ) {
        config.env[ env ] ? config[ `workflow.${ flag }` ].env = env : print.error( `env<${ env }> undefined.` );
    }
    else if ( !env && cmd.env && config.env && Object.keys( config.env ).length > 0 ) {
        const questions = [
            {
                type: 'list',
                name: 'chooseEnv',
                message: `请选择${ flag == 'dev' ? '开发' : '构建' }环境`,
                choices: Object.keys( config.env ),
                default: 0,
            },
        ];

        const { chooseEnv } = await prompt( questions );

        config[ `workflow.${ flag }` ].env = chooseEnv;
    }

    const workflowConfig = config[ `workflow.${ flag }` ] || { };

    console.log( `ℹ ｢wdm｣: launching ${ chalk.bold( flag ) }${ workflowConfig && workflowConfig.env ? `, env: ${ chalk.bold.underline( workflowConfig.env ) }` : '' }` );

    config.friendlyErrors = true;

    const engine = require('legoflow-engine');

    const { Messager } = engine;

    const { sender } = Messager;

    Messager.sender = ( { type, msg } ) => {
        if ( type === 'success' ) {
            print.success( 'started dev service' );
        }
        else {
            sender( { type, msg } );
        }
    }

    engine[ flag ]( config );
};
