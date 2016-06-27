/* eslint no-invalid-this: 1*/

import _isUndefined from 'lodash/isUndefined';
import _merge from 'lodash/merge';

let taskMetadata = {
    description: 'Inicia servidor browsersync.',
    options: {
        options: {
            browserSyncConfig: 'Configurações para o browserSync',
            debug: 'Indica se debug está habilitado para a task'
        }
    }
};

let defaultBrowserSyncConfig = {};

/**
 * @class
 */
class BrowserSyncTask {

    /**
     * Configura a task
     *
     * @param {Object} options - opções de configuração passadas para a Task
     *
     * @returns {BrowserSyncTask} - A própria instância de BrowserSyncTask
     */
    setOptions( options ) {
        this.options = options;

        if ( _isUndefined( this.options.browserSyncConfig ) ) {
            throw new Error( 'BrowserSync: browserSyncConfig is missing from configuration!' );
        }
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
            this.options.taskMaker.startNewBrowserSync( this.options.taskName, this.options.browserSyncConfig, ( bs ) => {
                this.log( 'browserSync started', 'yellow' );
                cb();
            } );
        } );
    }
}
export default BrowserSyncTask;



