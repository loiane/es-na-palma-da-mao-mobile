﻿import plumber from 'gulp-plumber';
import cached from 'gulp-cached';
import changed from 'gulp-changed';
import rename from 'gulp-rename';
import replace from 'gulp-replace-task';
import _isUndefined from 'lodash/isUndefined';
import _forEach from 'lodash/forEach';
import debug from 'gulp-debug';

let taskMetadata = {
    description: 'Copia arquivos para pasta destino.',
    options: {
        options: {
            src: 'Source (glob)',
            dest: 'Destino (glob)',
            changed: 'Opções para plugin gulp-changed',
            replace: 'Opções para plugin gulp-replace-task',
            rename: 'Opções para plugin gulp-rename',
            debug: 'Indica se debug está habilitado para a task'
        }
    }
};


/**
 * @class
 */
class CopyTask {

    /**
     * Configura a task
     *
     * @param {Object} options - opções de configuração passadas para a Task
     *
     * @returns {CopyTask} - A própria instância de CopyTask
     */
    setOptions( options ) {
        this.options = options;

        if ( _isUndefined( this.options.src ) ) {
            throw new Error( 'CopyTask: src é obrigatório!' );
        }

        if ( _isUndefined( this.options.dest ) ) {
            throw new Error( 'CopyTask: dest é obrigatório!' );
        }

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
        let options = this.options;

        gulp.task( options.taskName, taskMetadata.description, options.taskDeps, () => {
            let chain = gulp.src( options.src )
                            .pipe( cached( options.taskName ) )
                            .pipe( plumber() );

            if ( options.changed ) {
                chain = chain.pipe( changed( options.dest, options.changed ) );
            }

            if ( options.replace ) {
                chain = chain.pipe( replace( options.replace ) );
            }

            if ( options.rename ) {
                chain = chain.pipe( rename( options.rename ) );
            }

            if ( options.debug.active ) {
                chain = chain.pipe( debug( options.debug ) );
            }

            chain = chain.pipe( gulp.dest( options.dest ) );

            _forEach( options.globalBrowserSyncs, ( bs ) => {
                chain = chain.pipe( bs.stream() );
            } );

            return chain;
        }, taskMetadata.options );
    }
}

export default CopyTask;
