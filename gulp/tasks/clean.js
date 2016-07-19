import vinylPaths from 'vinyl-paths';
import del from 'del';
import _isUndefined from 'lodash/isUndefined';
import _isArray from 'lodash/isArray';
import debug from 'gulp-debug';

let taskMetadata = {
    description: 'Apaga diretório/arquivos',
    options: {
        options: {
            src: 'Source (glob)',
            dest: 'Destino (glob)',
            debug: 'Indica se debug está habilitado para a task'
        }
    }
};

/**
 * @class
 */
class CleanTask {

    /**
     * Configura a task
     *
     * @param {Object} options - opções de configuração passadas para a Task
     *
     * @returns {CleanTask} - A própria instância de CleanTask
     */
    setOptions( options ) {
        this.options = options;

        if ( _isUndefined( this.options.src ) ) {
            throw new Error( 'CleanTask: src é obrigatório!' );
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
            if ( !_isArray( options.src ) ) {
                options.src = [ options.src ];
            }

            let chain = gulp.src( options.src );

            if ( options.debug.active ) {
                chain = chain.pipe( debug( options.debug ) );
            }

            return chain.pipe( vinylPaths( del ) );
        }, taskMetadata.options );
    }
}

export default CleanTask;
