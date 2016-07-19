import htmlMin from 'gulp-htmlmin';
import plumber from 'gulp-plumber';
import _isUndefined from 'lodash/isUndefined';
import _merge from 'lodash/merge';
import _forEach from 'lodash/forEach';
import debug from 'gulp-debug';
import cache from 'gulp-cached';
import changed from 'gulp-changed';

/**
 *
 * @type {{description: string, options: {options: {src: string, dest: string, minimize: string, debug: string}}}}
 */
let taskMetadata = {
    description: 'minimiza Htmls e copia para pasta detino.',
    options: {
        options: {
            src: 'Arquivos source (glob)',
            dest: 'Arquivos destino (glob)',
            minimize: 'Opções para plugin gulp-htmlmin',
            debug: 'indica se debug está habilitado para a task'
        }
    }
};

/**
 * @class
 */
class HtmlMinifyTask {

    /**
     * Configura a task
     *
     * @param {Object} options - opções de configuração passadas para a Task
     *
     * @returns {HtmlMinifyTask} - A própria instância de HtmlMinifyTask
     */
    setOptions( options ) {
        this.options = options;

        if ( _isUndefined( this.options.src ) ) {
            throw new Error( 'HtmlMinifyTask: src é obrigatório!' );
        }

        if ( _isUndefined( this.options.dest ) ) {
            throw new Error( 'HtmlMinifyTask: dest é obrigatório!' );
        }

        this.options.minimize = _merge( {
            keepClosingSlash: true
        }, this.options.minimize );

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

            chain = chain.pipe( cache( options.taskName ) )
                         .pipe( plumber() )
                         .pipe( htmlMin( options.minimize ) )
                         .pipe( changed( options.dest, { extension: '.html' } ) );

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

export default HtmlMinifyTask;
