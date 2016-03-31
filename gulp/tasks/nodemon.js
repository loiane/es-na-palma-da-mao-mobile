/* eslint no-invalid-this: 1*/

import _isUndefined from 'lodash/isUndefined';
import _merge from 'lodash/merge';
import nodemon from 'gulp-nodemon';
import { argv } from 'yargs';

let defaultNodemonConfig = {};
let defaultBrowserSyncConfig = {};

class NodemonTask {

    setOptions( options ) {
        this.options = options;

        if ( _isUndefined( this.options.nodemonConfig ) ) {
            throw new Error( 'NodemonTask: nodemonConfig is missing from configuration!' );
        }

        if ( _isUndefined( this.options.browserSyncConfig ) ) {
            throw new Error( 'BrowserSync: browserSyncConfig is missing from configuration!' );
        }

        this.options.nodemonConfig = _merge( {}, defaultNodemonConfig, this.options.nodemonConfig );
        this.options.browserSyncConfig = _merge( {}, defaultBrowserSyncConfig, this.options.browserSyncConfig );

        return this;
    }


    defineTask( gulp ) {

        let taskMetadata = {
            description: 'Inicia um servidor nodemom para servir a aplicação com browsersync configurado.',
            options: {
                options: {
                    nodemonConfig: 'Configurações para o nodemom server',
                    browserSyncConfig: 'Configurações para o browserSync',
                    debug: 'Indica se debug está habilitado para a task'
                }
            }
        };

        gulp.task( this.options.taskName, taskMetadata.description, this.options.taskDeps, ( cb ) => {
            this.serve( this.options.nodemonConfig, this.options.browserSyncConfig, cb );
        }, taskMetadata.options );
    }


    /**
    * serve the code
    * --debug-brk or --debug
    * --nosync
    */
    serve( nodemonConfig, browserSyncConfig, cb ) {
        let debugMode = '--debug';
        let options = this.options;
        this.nodemonStarted = false;

        nodemonConfig.nodeArgs = [ debugMode + '=5858' ];

        if ( argv.verbose ) {
            this.log( nodemonConfig );
        }

        // On nodemon start
        function onStart() {
            if ( !this.nodemonStarted ) {
                options.taskMaker.startNewBrowserSync( options.taskName, browserSyncConfig, ( bs ) => { /* eslint no-unused-vars: 0*/
                    this.nodemonStarted = true;
                    this.log( '*** nodemon started', 'yellow' );
                    this.log( 'browserSync started', 'yellow' );
                    cb();
                } );
            } else {
                /* eslint angular/timeout-service: 0*/
                setTimeout( () => {
                    options.taskMaker.reloadAllBrowserSync( { stream: false } );
                }, 0 );
            }
        }

        function onRestart( e ) {
            this.log( '*** nodemon restarted' );
            this.log( `files changed:\n ${e}` );
        }

        function onCrash() {
            this.log( '*** nodemon crashed: script crashed for some reason' );
        }

        function onExit() {
            this.log( '*** nodemon exited cleanly' );
        }

        nodemon( nodemonConfig )
                .on( 'start', onStart.bind( this ) )
                .on( 'restart', onRestart.bind( this ) )
                .on( 'crash', onCrash.bind( this ) )
                .on( 'exit', onExit.bind( this ) );
    }
}

export default NodemonTask;



