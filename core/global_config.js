'use strict';

const config = require('legoflow-config');

global.__config = config.getConfig( );

exports.set = ( name, value ) => {
    config.set( name, value );

    __config = config.getConfig( );

    print.success( `set ${ name }: ${ value }` );
};

exports.get = ( name ) => {
    const v = config.get( name );

    v ? console.log( v ) : print.error( 'attribute not exist' );
};

exports.clean = ( name, value ) => {
    config.clean( );

    __config = config.getConfig( );

    print.success( 'clean finish' );
};
