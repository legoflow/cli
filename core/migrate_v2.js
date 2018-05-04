'use strict';

const path = require('path');
const fs = require('fs-extra');
const YAML = require('yamljs');
const formatYamlFile = require('format-yaml');

const CONFIG_MAPPING = {
    name: 'name',
    type: 'type',
    es6: 'ES.Next',
    hot: 'hot',
    alias: 'alias',
    global: 'global',
    externals: 'externals',
    watch: '$workflow.dev$watch.reload',
    assets: '$workflow.build$html.resourcesDomain',
    packImgSize: '$workflow.build$bundle.limitImgSize',
    shell: '$workflow.build$shell',
    'build.env': '$workflow.build$env',
    'user.dev.args': '$workflow.dev$user.args',
    'user.build.args': '$workflow.build$user.args',
    'assets.css': '$workflow.build$css.resourcesDomain',
    'onlyRunShell': '$workflow.build$onlyRunShell',
    publicPath: '$workflow.build$publicPath',
}

module.exports = async function ( ) {
    const root = process.cwd( );

    const legoflowJson = path.resolve( root, 'legoflow.json' );

    const oldConfig = JSON.parse( fs.readFileSync( legoflowJson, 'utf8' ) );

    let newConfig = { };

    const transform = ( _old ) => {
        let _new = { };

        for ( let attr in CONFIG_MAPPING ) {
            if (
                ( _old[ attr ] && typeof _old[ attr ] === 'array' && _old[ attr ].length > 0 ) ||
                ( _old[ attr ] && typeof _old[ attr ] === 'string' ) ||
                ( _old[ attr ] && typeof _old[ attr ] === 'object' && Object.keys( _old[ attr ] ).length > 0 ) ||
                ( typeof _old[ attr ] === 'boolean' )
            ) {
                const value = _old[ attr ];

                let newAttr = CONFIG_MAPPING[ attr ];

                if ( newAttr.indexOf( '$' ) === 0 ) {
                    newAttr = newAttr.split( '$' ).filter( ( k ) => k != '' );

                    if ( !_new[ newAttr[ 0 ] ] ) {
                        _new[ newAttr[ 0 ] ] = { };
                    }

                    _new[ newAttr[ 0 ] ][ newAttr[ 1 ] ] = value;
                }
                else {
                    _new[ newAttr ] = value;
                }

                if ( attr === 'type' ) {
                    _new.REM = value === 'mobile' ? true : false;
                }
            }
        }

        return _new;
    }

    // default config
    newConfig = transform( oldConfig );

    if ( oldConfig.env ) {
        newConfig.env = { };

        for ( let env in oldConfig.env ) {
            newConfig.env[ env ] = transform( oldConfig.env[ env ] );
        }
    }

    const newConfigFile = path.resolve( root, 'legoflow.yml' );

    let yamlString = YAML.stringify( newConfig, 4 );

    const reg = /'''.\S*'''/g;

    const match = yamlString.match( reg ) || [ ];

    if ( match && match.length > 0 ) {
        const matchValue = match.map( ( v ) => ( v.split( '\'\'\'' ).filter( v => v !== '' ) )[ 0 ] );

        matchValue.forEach( ( item, index ) => {
            yamlString = yamlString.replace( `'''${ item }'''`, `"'${ item }'"` );
        } );
    }

    fs.writeFileSync( newConfigFile, yamlString );

    fs.writeFileSync( newConfigFile, await formatYamlFile( newConfigFile ) );

    fs.renameSync( legoflowJson, path.resolve( root, 'legoflow.v1.json' ) );

    print.success( 'migrate success' );
};
