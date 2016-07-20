import _isUndefined from 'lodash/isUndefined';
import _forEach from 'lodash/forEach';
import plumber from 'gulp-plumber';
import autoprefixer from 'gulp-autoprefixer';
import debug from 'gulp-debug';
import cache from 'gulp-cached';
import changed from 'gulp-changed';
import sass from 'gulp-sass';


let taskMetadata = {
    description: 'Compila scss para css',
    options: {
        options: {
            src: 'Source (glob)',
            dest: 'Destino (glob)',
            debug: 'Indica se debug está habilitado para a task',
            plumberOptions: 'Opções para plugin gulp-plumber',
            autoprefixer: 'Opções para plugin gulp-autoprefixer',
            sass: 'Opções para plugin gulp-sass'
        }
    }
};

/**
 * @class
 */
class SassTask {

    /**
     * Configura a task
     *
     * @param {Object} options - opções de configuração passadas para a Task
     *
     * @returns {SassTask} - A própria instância de SassTask
     */
    setOptions( options ) {
        this.options = options;

        if ( _isUndefined( this.options.src ) ) {
            throw new Error( 'SassTask: src é obrigatório!' );
        }

        if ( _isUndefined( this.options.dest ) ) {
            throw new Error( 'SassTask: dest é obrigatório!' );
        }

        if ( this.options.notify ) {
            this.options.plumberOptions = this.options.defaultErrorHandler;
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
                            .pipe( cache( options.taskName ) )
                            .pipe( plumber( options.plumberOptions ) )
                            .pipe( changed( options.dest, { extension: '.scss' } ) )
                            .pipe( sass( options.sass ) )
                            .pipe( autoprefixer( options.autoprefixer ) );

            if ( options.debug.active ) {
                chain = chain.pipe( debug( options.debug ) );
            }

            _forEach( options.globalBrowserSyncs, ( bs ) => {
                chain = chain.pipe( bs.stream() );
            } );

            return chain.pipe( gulp.dest( options.dest ) );

        }, taskMetadata.options );
    }
}

export default SassTask;
