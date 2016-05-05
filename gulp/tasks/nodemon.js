/* eslint no-invalid-this: 1*/

import _isUndefined from 'lodash/isUndefined';
import _merge from 'lodash/merge';
import nodemon from 'gulp-nodemon';
import { argv } from 'yargs';

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

let defaultNodemonConfig = {};
let defaultBrowserSyncConfig = {};

/**
 * @class
 */
class NodemonTask {

    /**
     * Configura a task
     *
     * @param {Object} options - opções de configuração passadas para a Task
     *
     * @returns {NodemonTask} - A própria instância de NodemonTask
     */
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

    /**
     * Cria a task
     *
     * @param {Object} gulp - O gulp
     *
     * @returns {void}
     */
    defineTask( gulp ) {
        gulp.task( this.options.taskName, taskMetadata.description, this.options.taskDeps, ( cb ) => {
            this.serve( this.options.nodemonConfig, this.options.browserSyncConfig, cb );
        }, taskMetadata.options );
    }

    /**
     * Inicia o servidor nodemon
     *
     * @param {Object} nodemonConfig - Configurações para plugin gulp-nodemom
     * @param {Object} browserSyncConfig - Configurações para plugin gulp-browsersyn
     * @param {Function} cb - callback
     *
     * @returns {void}
     */
    serve( nodemonConfig, browserSyncConfig, cb ) {
        let debugMode = '--debug';
        let options = this.options;
        this.nodemonStarted = false;

        nodemonConfig.nodeArgs = [ debugMode + '=5858' ];

        if ( argv.verbose ) {
            this.log( nodemonConfig );
        }

        /**
         * Executado quando o servidor inicia
         *
         * @returns {void}
         */
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

        /**
         * Executado quando o servidor dá erro
         *
         * @param {Object} e - o evento disparado
         *
         * @returns {void}
         */
        function onRestart( e ) {
            this.log( '*** nodemon restarted' );
            this.log( `files changed:\n ${e}` );
        }

        /**
         * Executado quando o servidor dá erro
         *
         * @returns {void}
         */
        function onCrash() {
            this.log( '*** nodemon crashed: script crashed for some reason' );
        }

        /**
         * Executado quando o servidor para
         *
         * @returns {void}
         */
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



