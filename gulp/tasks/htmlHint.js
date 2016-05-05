import htmlhint from 'gulp-htmlhint';
import plumber from 'gulp-plumber';
import _isUndefined from 'lodash/isUndefined';
import debug from 'gulp-debug';

let taskMetadata = {
    description: 'Analiza arquivos .html com htmlhint e reporta resultado.',
    options: {
        options: {
            src: 'Arquivos source (glob)',
            debug: 'Indica se debug está habilitado para a task'
        }
    }
};

/**
 * @class
 */
class HtmlHintTask {

    /**
     * Configura a task
     *
     * @param {Object} options - opções de configuração passadas para a Task
     *
     * @returns {HtmlHintTask} - A própria instância de HtmlHintTask
     */
    setOptions( options ) {
        this.options = options;

        if ( _isUndefined( this.options.src ) ) {
            throw new Error( 'HtmlHintTask: src é obrigatório!' );
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
            let chain = gulp.src( options.src );

            if ( options.debug.active ) {
                chain = chain.pipe( debug( options.debug ) );
            }
            chain = chain.pipe( plumber() )
                         .pipe( htmlhint( '.htmlhintrc' ) )
                         .pipe( htmlhint.reporter() );

            return chain;
        }, taskMetadata.options );
    }
}

export default HtmlHintTask;
