'use strict';

const r2 = require('r2');
const chalk = require('chalk');
const boxen = require('boxen');
const compareVersion = require('compare-versions');

const { version: nowVersion } = require('../package.json');

module.exports = async ( ) => {
    try {
        const { version } = JSON.parse( await r2( 'https://raw.githubusercontent.com/legoflow/legoflow-cli/master/package.json' ).text );

        if ( compareVersion( version, nowVersion ) > 0 ) {
            console.log(
                boxen(
                    chalk.yellow( `Update available ${ nowVersion } → ${ chalk.bold.yellow.underline( version ) }\nRun ${ chalk.bold.green( 'npm i -g legoflow-cli' ) } to update\nView Changelog ${ chalk.bold.yellow.underline( 'http://t.cn/RBXqa7b' ) }` ),
                    {
                        padding: { left: 1, right: 1 },
                        borderStyle: 'double',
                        borderColor: 'yellow',
                    }
                )
            )
        }
    } catch ( e ) {
        console.error( '[CHECK UPDATE ERROR]', e );
    }
};
