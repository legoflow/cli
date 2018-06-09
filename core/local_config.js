'use strict';

const config = require('legoflow-config');

exports.set = ( name, value ) => {
    config.set( name, value );

    print.success( `set ${ name }: ${ value }` );
};

exports.get = ( name ) => {
    return config.get( name ) || '';
};

exports.clean = ( name, value ) => {
    config.clean( );

    print.success( 'clean finish' );
};
