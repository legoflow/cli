'use strict';

const path = require('path');
const net = require('net');

const port = 3100;
const defaultWebpackPort = 6700;

const checkPortIsFree = ( port, callback ) => {
    if ( port - defaultWebpackPort <= 10 ) {
        const server = net.createServer().listen( port )

        server.on( 'listening', ( ) => {
            server.close( );
            callback( port );
        } )

        server.on( 'error', ( e ) => {
            checkPortIsFree( port + 1, callback );
        } )
    }
    else {
        callback( false );
    }
}

module.exports = async ( flag ) => {
    const projectPath = process.cwd( );

    const root = path.resolve( __dirname, '../' );

    const config = projectPath.getConfig( { projectPath, root } );

    const webpackPort = await ( ( ) => {
        return new Promise( (resolve, reject) => {
            checkPortIsFree( defaultWebpackPort + 1, resolve );
        } )
    } )( );

    if ( !webpackPort ) {
        console.error( 'can not find free port for webpack.' );
    }

    config.port = port;
    config.webpackPort = webpackPort;
    config.autoOpenChrome = true;

    if ( flag === 'dev' ) {
        config.workflow = 'dev';
    }

    if ( flag === 'build' ) {
        config.workflow = 'build';
    }

    return config;
};
