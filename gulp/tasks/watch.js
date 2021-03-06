﻿import del from 'del';
import path from 'path';
import gutil from 'gulp-util';
import _isUndefined from 'lodash/isUndefined';

let taskMetadata = {
    description: 'Monitora arquivos e executa tarefas especificadas.',
    options: {
        options: {
            src: 'Source (glob)',
            dest: 'Destino (glob)',
            tasks: 'Array de tasks executadas quando arquivos forem alterados.',
            debug: 'Indica se debug está habilitado para a task'
        }
    }
};

/**
 * @class
 */
class WatchTask {

    /**
     * Configura a task
     *
     * @param {Object} options - opções de configuração passadas para a Task
     *
     * @returns {WatchTask} - A própria instância de WatchTask
     */
    setOptions( options ) {
        this.options = options;

        if ( _isUndefined( this.options.src ) ) {
            throw new Error( 'WatchTask: src é obrigatório!' );
        }

        if ( _isUndefined( this.options.tasks ) ) {
            throw new Error( 'WatchTask: tasks é obrigatório!' );
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
            this.watch( gulp );
            this.log( `Escutando arquivos: \'${options.src}\'` );
        }, taskMetadata.options );
    }

    /**
     * Watch
     *
     * @param {Object} gulp - O gulp
     *
     * @returns {void}
     */
    watch( gulp ) {

        let options = this.options;
        let watcher = gulp.watch( options.src, options.tasks );

        watcher.on( 'change', ( event ) => {
            gutil.log( gutil.colors.magenta( `File ${event.path} was ${event.type}, running tasks: ${options.tasks}` ) );

            // https://github.com/gulpjs/gulp/blob/master/docs/recipes/handling-the-delete-event-on-watch.md
            if ( event.type === 'deleted' && !_isUndefined( options.dest ) ) {
                let filePathFromSrc = path.relative( path.resolve( options.src ), event.path );
                let destFilePath = path.resolve( options.dest, filePathFromSrc );
                del.sync( destFilePath );
            }
        } );
    }
}

export default WatchTask;
