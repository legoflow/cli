#!/usr/bin/env node

'use strict';

console.log( 'Enter CI' );

global.print = require('./core/print');
global.util = require('legoflow-engine/util');

const initEngine = require('./core/init_engine');
const workflow = require('./core/workflow');
const { version } = require('./package.json');

( async ( ) => {
    const env = process.argv[ 2 ];

    env && console.log( `Env: ${ env }` );

    console.log( `CI Version: ${ version }` );

    await initEngine( );

    console.log( `Engine Init Finish` );

    workflow( 'build', env );
} )( );

