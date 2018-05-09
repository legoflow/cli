'use strict';

const chalk = require('chalk');

module.exports = {
    success ( msg ) {
        console.log( chalk.bold.green( `[SUCCESS] ${ msg }` ) );
    },
    error ( msg ) {
        console.error( chalk.bgRed( `[ERROR] ${ msg }` ) );
    },
};
