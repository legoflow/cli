'use strict';

const path = require('path');
const net = require('net');
const findFreePort = require('find-free-port');

const defaultPort = 3100;
const defaultWebpackPort = 6700;

const localConfig = require('./local_config');

module.exports = async ( flag ) => {
    const projectPath = process.cwd( );

    const root = path.resolve( __dirname, '../' );

    const config = projectPath.getConfig( { projectPath, root } );

    if ( !config ) {
        print.error( '找不到项目配置文件，请检查路径' );

        return void 0;
    }

    const webpackPort = await ( ( ) => {
        return new Promise( ( resolve, reject ) => {
            findFreePort( defaultWebpackPort, defaultWebpackPort + 10,  ( err, freePort ) => {
                resolve( freePort );
            } );
        } )
    } )( );

    if ( !webpackPort ) {
        console.error( 'can not find free port for webpack.' );
    }

    const { autoOpenChrome, port, user } = localConfig.get( );

    config.user = user;
    config.port = port || defaultPort;
    config.webpackPort = webpackPort;
    config.autoOpenChrome = typeof autoOpenChrome !== 'undefined' ? autoOpenChrome : true ;

    if ( flag === 'dev' ) {
        config.workflow = 'dev';
    }
    else if ( flag === 'build' ) {
        config.workflow = 'build';
    }

    return config;
};
