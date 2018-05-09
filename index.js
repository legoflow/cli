#!/usr/bin/env node

'use strict';

const program = require('commander');
const chalk = require('chalk');
const shell = require('shelljs');
const compareVersion = require('compare-versions');

global.print = require('./core/print');

const nodeVersion = shell.exec( 'node --version', { silent: true } ).stdout;
const mainVersion = nodeVersion.split( '.' )[ 0 ][ 1 ];

if ( parseInt( mainVersion ) < 8 ) {
    print.error( 'node.js version need to >= 8' );

    return void 0;
}

const initEngine = require('./core/init_engine');
const checkUpdate = require('./core/check_update');
const workflow = require('./core/workflow');
const killPort = require('./core/kill_port');
const globalConfog = require('./core/global_config');

const { version } = require('./package.json');

global.util = require('legoflow-engine/util');

( async ( ) => {
    await checkUpdate( );

    await initEngine( );

    program
        .version( version )
        .description( `${ chalk.blue.bold( 'LegoFlow CLI' ) }, ${ chalk.underline( 'https://legoflow.com' ) }` )

    program
        .command( 'new' )
        .description( 'new project' )
        .action( require('./core/new_project') )

    program
        .command( 'set <name> <value>' )
        .description( 'set config <name> <value>' )
        .action( globalConfog.set )

    program
        .command( 'get <name>' )
        .description( 'get config <name>' )
        .action( globalConfog.get )

    program
        .command( 'clean' )
        .description( 'clean config' )
        .action( globalConfog.clean )

    program
        .command( 'migrate:v2' )
        .description( 'migrate project to v2' )
        .action( require('./core/migrate_v2') )

    program
        .command( 'kill:port <port>' )
        .description( 'kill thread by port' )
        .action( killPort )

    program
        .command( 'dev [env]' )
        .option('-e, --env', 'env list')
        .description( chalk.yellow( 'run dev workflow in project' ) )
        .action( ( env, cmd ) => workflow( 'dev', env, cmd ) )

    program
        .command( 'build [env]' )
        .option('-e, --env', 'env list')
        .description( chalk.yellow( 'run build workflow in project' ) )
        .action( ( env, cmd ) => workflow( 'build', env, cmd ) )

    program.parse( process.argv );
} )( )
