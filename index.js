#!/usr/bin/env node

'use strict';

const program = require('commander');

const initEngine = require('./core/init_engine');
const checkUpdate = require('./core/check_update');
const workflow = require('./core/workflow');

const globalConfog = require('./core/global_config');

const util = require('legoflow-engine/util');

const { version } = require('./package.json');

global.print = require('./core/print');

( async ( ) => {

    await checkUpdate( );

    await initEngine( );

    program
        .version( version )
        .description( 'LegoFlow CLI' )

    program
        .command( 'new' )
        .description( 'New project' )
        .action( require('./core/new_project') )

    program
        .command( 'set <name> <value>' )
        .description( 'Set config <name> <value>' )
        .action( globalConfog.set )

    program
        .command( 'get <name>' )
        .description( 'Get config <name>' )
        .action( globalConfog.get )

    program
        .command( 'clean' )
        .description( 'Clean config' )
        .action( globalConfog.clean )

    program
        .command( 'migrate:v2' )
        .description( 'Migrate project to v2' )
        .action( require('./core/migrate_v2') )

    program
        .command( 'dev' )
        .description( 'Run dev workflow in project' )
        .action( ( ) => workflow( 'dev' ) )

    program
        .command( 'build' )
        .description( 'Run build workflow in project' )
        .action( ( ) => workflow( 'build' ) )

    program.parse( process.argv );
} )( )

