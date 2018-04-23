'use strict';

const buildConfig = require('./build_config');

module.exports = async ( flag ) => {
    const config = await buildConfig( flag );

    if ( !config ) {
        console.error( '找不到配置文件' );

        return void 0;
    }

    require('legoflow-engine')[ flag ]( config );
};
