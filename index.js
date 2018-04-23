#!/usr/bin/env node

'use strict';

const program = require('commander');

const initEngine = require('./core/init_engine');
const checkUpdate = require('./core/check_update');
const workflow = require('./core/workflow');

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

