import plumber from 'gulp-plumber';
import _isUndefined from 'lodash/isUndefined';
import _merge from 'lodash/merge';
import debug from 'gulp-debug';
import bump from 'gulp-bump';

let taskMetadata = {
    description: 'Incrementa a versão da aplicação',
    options: {
        options: {
            src: 'Source (glob)',
            dest: 'Destino (glob)',
            debug: 'Indica se debug está habilitado para a task',
            bump: 'Opções para o plugin gulp-bump'
        }
    }
};

let defaultBumpOptions = {
    type: 'patch'
};

/**
 * @class
 */
class BumpTask {

    /**
     * Configura a task
     *
     * @param {Object} options - opções de configuração passadas para a Task
     *
     * @returns {BumpTask} - A própria instância de BumpTask
     */
    setOptions( options ) {
        this.options = options;

        if ( _isUndefined( this.options.src ) ) {
            throw new Error( 'BumpTask: src é obrigatório!' );
        }

        if ( _isUndefined( this.options.dest ) ) {
            throw new Error( 'BumpTask: dest é obrigatório!' );
        }

        this.options.bumpConfig = _merge( {}, defaultBumpOptions, options.bumpConfig );

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
                            .pipe( plumber() )
                            .pipe( bump( options.bumpConfig ) );

            if ( options.debug.active ) {
                chain = chain.pipe( debug( options.debug ) );
            }

            return chain.pipe( gulp.dest( options.dest ) );
        }, taskMetadata.options );
    }
}

export default BumpTask;
