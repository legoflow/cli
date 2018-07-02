#!/usr/bin/env node

'use strict';

const program = require('commander');
const chalk = require('chalk');

global.print = require('./core/print');

const initEngine = require('./core/init_engine');
const checkUpdate = require('./core/check_update');
const workflow = require('./core/workflow');
const killPort = require('./core/kill_port');
const localConfig = require('./core/local_config');

const { version } = require('./package.json');

global.util = require('legoflow-engine/util');

( async ( ) => {
    program
        .version( version )
        .option('-v, --version', 'output the version number')
        .description( `${ chalk.blue.bold( 'LegoFlow CLI' ) }, ${ chalk.underline( 'https://legoflow.com' ) }` )

    program
        .command( 'init' )
        .description( 'init new project' )
        .action( require('./core/new_project') )

    program
        .command( 'set <name> <value>' )
        .description( 'set config <name> <value>' )
        .action( localConfig.set )

    program
        .command( 'get <name>' )
        .description( 'get config <name>' )
        .action( localConfig.get )

    program
        .command( 'clean' )
        .description( 'clean config' )
        .action( localConfig.clean )

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
        .action(
            ( env, cmd ) => {
                checkUpdate( )
                    .then( initEngine )
                    .then( ( ) => workflow( 'dev', env, cmd ) )
            }
        )

    program
        .command( 'build [env]' )
        .option('-e, --env', 'env list')
        .description( chalk.yellow( 'run build workflow in project' ) )
        .action(
            ( env, cmd ) => {
                checkUpdate( )
                    .then( initEngine )
                    .then( ( ) => workflow( 'build', env, cmd ) )
            }
        )

    program
        .command( 'build:dll' )
        .description( chalk.yellow( 'run build dll' ) )
        .action(
            ( cmd ) => {
                checkUpdate( )
                    .then( initEngine )
                    .then( ( ) => workflow( 'dll', void 0, cmd ) )
            }
        )

    program.on( 'command:*', function ( ) {
        console.log( chalk.yellow( `! Command not found. Please try to use ${ chalk.yellow.bold( '-h' ) }` ) );
        process.exit( 1 );
    } )

    program.parse( process.argv );
} )( )
