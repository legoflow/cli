'use strict';

const path = require('path');
const fs = require('fs-extra');
const YAML = require('yamljs');
const formatYamlFile = require('format-yaml');

module.exports = async function ( ) {
    const root = process.cwd( );

    const legoflowJson = path.resolve( root, 'legoflow.json' );

    const oldConfig = JSON.parse( fs.readFileSync( legoflowJson, 'utf8' ) );

    const newConfig = { };

    newConfig.name = oldConfig.name || '';
    newConfig.type = oldConfig.type || '';
    newConfig.alias = oldConfig.alias || { };
    newConfig.global = oldConfig.global || { };
    newConfig.externals = oldConfig.externals || { };
    newConfig.hot = oldConfig.hot || false;
    newConfig.env = oldConfig.env || { };
    newConfig.REM = oldConfig.type === 'mobile' ? true : false;

    newConfig[ 'ES.Next' ] = oldConfig.es6 || true;

    const workflowDevConfig = { };

    workflowDevConfig[ 'watch.reload' ] = oldConfig.watch || [ ];
    workflowDevConfig[ 'user.args' ] = oldConfig[ 'user.dev.args' ] || { };

    const workflowBuildConfig = { };

    workflowBuildConfig[ 'html.resourcesDomain' ] = oldConfig.assets || '';
    workflowBuildConfig[ 'css.resourcesDomain' ] = oldConfig[ 'assets.css' ] || '';
    workflowBuildConfig[ 'cache' ] = oldConfig.cache || '';
    workflowBuildConfig[ 'env' ] = oldConfig[ 'build.env' ] || '';
    workflowBuildConfig[ 'user.args' ] = oldConfig[ 'user.build.args' ] || { };
    workflowBuildConfig[ 'shell' ] = oldConfig.shell || '';
    workflowBuildConfig[ 'onlyRunShell' ] = oldConfig.onlyRunShell || false;
    workflowBuildConfig[ 'bundle.limitImgSize' ] = oldConfig.packImgSize || '';

    newConfig[ 'workflow.dev' ] = workflowDevConfig;
    newConfig[ 'workflow.build' ] = workflowBuildConfig;

    const newConfigFile = path.resolve( root, 'legoflow.yml' );

    fs.writeFileSync( newConfigFile, YAML.stringify( newConfig, 4 ) );

    fs.writeFileSync( newConfigFile, await formatYamlFile( newConfigFile ) );

    fs.renameSync( legoflowJson, path.resolve( root, 'legoflow.v1.json' ) );

    print.success( 'migrate success' );
};
