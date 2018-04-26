'use strict';

const buildConfig = require('./build_config');

module.exports = async ( flag ) => {
    const config = await buildConfig( flag );

    if ( !config ) {
        console.error( '找不到配置文件' );

        return void 0;
    }

    const engine = require('legoflow-engine');

    const { Messager } = engine;

    const { sender } = Messager;

    Messager.sender = ( { type, msg } ) => {
        if ( type === 'success' ) {
            msg = flag.toUpperCase( );
        }

        sender( { type, msg } );
    }

    engine[ flag ]( config );
};
