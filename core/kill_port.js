'use strict';

const { kill } = require('cross-port-killer');

module.exports = ( port ) => {
    kill( port ).then( ( pids ) => {
        print.success( `killed thread:${ port }` );
    } )
};
