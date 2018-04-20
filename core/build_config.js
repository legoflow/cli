'use strict';

const path = require('path');

const port = 3100;
const webpackPort = 6700;

module.exports = ( program ) => {
    const projectPath = process.cwd( );

    const root = path.resolve( __dirname, '../' );

    const config = projectPath.getConfig( { projectPath, root } );

    config.port = port;
    config.webpackPort = webpackPort;

    if ( program.dev ) {
        config.workflow = 'dev';
    }

    if ( program.build ) {
        config.workflow = 'build';
    }

    return config;
};
