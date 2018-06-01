'use strict';

const chalk = require('chalk');

module.exports = {
    success ( msg ) {
        console.log( chalk.green.bold( `✔ [SUCCESS] ${ msg }` ) );
    },
    error ( msg ) {
        console.log( chalk.red.bold( `!! [ERROR] ${ msg }` ) );
    },
};
