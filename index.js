#!/usr/bin/env node

'use strict';

const program = require('commander');

const initEngine = require('./core/init_engine');
const buildConfig = require('./core/build_config');
const util = require('legoflow-engine/util');

const { dev, build } = require('legoflow-engine');

const { version } = require('./package.json');

( async ( ) => {
    await initEngine( );

    program
        .version( version )
        .description( 'LegoFlow CLI' )
        .option('dev', 'Run dev workflow in folder', true )
        .option('build', 'Run build workflow in folder', true )
        .parse( process.argv );

    const config = buildConfig( program );

    if ( !config ) {
        console.error( '找不到配置文件' );

        return void 0;
    }

    switch ( config.workflow ) {
        case 'dev': {
            dev( config );

            break;
        }
        case 'build': {
            build( config );

            break;
        }
    }

} )( )

