#!/usr/bin/env node

'use strict';

const program = require('commander');

const initEngine = require('./core/init_engine');
const checkUpdate = require('./core/check_update');
const workflow = require('./core/workflow');

const util = require('legoflow-engine/util');
const newProject = require('./core/new_project');

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
        .description( 'New legoflow-project' )
        .action( newProject )

    program
        .command( 'dev' )
        .description( 'Run dev workflow in legoflow-project' )
        .action( ( ) => workflow( 'dev' ) )

    program
        .command( 'build' )
        .description( 'Run build workflow in legoflow-project' )
        .action( ( ) => workflow( 'build' ) )

    program.parse( process.argv );
} )( )

