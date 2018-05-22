'use strict';

const chalk = require('chalk');
const { Signale } = require('signale');

const options = {
    types: {
        error: {
            badge: '!!',
            color: 'red',
            label: 'ERROR'
        },
        success: {
            badge: '✔',
            color: 'green',
            label: 'SUCCESS'
        }
    }
};

const print = new Signale( options );

module.exports = {
    success ( msg ) {
        print.success( msg );
    },
    error ( msg ) {
        print.error( msg );
    },
};
