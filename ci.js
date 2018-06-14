#!/usr/bin/env node

'use strict';

console.log( 'Enter CI' );

global.print = require('./core/print');
global.util = require('legoflow-engine/util');

const initEngine = require('./core/init_engine');
const workflow = require('./core/workflow');
const { version } = require('./package.json');

( async ( ) => {
    console.log( `CI Version: ${ version }` );

    await initEngine( );

    console.log( `Engine Init Finish` );

    workflow( );
} )( );

