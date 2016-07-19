import _isUndefined from 'lodash/isUndefined';
import plumber from 'gulp-plumber';
import debug from 'gulp-debug';
import cached from 'gulp-cached';
import tslint from 'gulp-tslint';

let taskMetadata = {
    description: 'Realiza uma análize de qualdade de código Javascript usando [TSLint](http://palantir.github.io/tslint/) e reporta o resultado.',
    options: {
        options: {
            src: 'Source (glob)',
            dest: 'Destino (glob)',
            debug: 'Indica se debug está habilitado para a task',
            lintConfig: 'Opções para o plugin gulp-tslint'
        }
    }
};

/**
 * TSLint Task.
 *
 * Mais em: http://palantir.github.io/tslint/
 *
 * @returns {void}
 */
class TSlintTask {

    /**
     * Configura a task
     *
     * @param {Object} options - opções de configuração passadas para a Task
     *
     * @returns {TSLintTask} - A própria instância de TSLint
     */
    setOptions( options = { lintConfig: {
        tslint: require( 'tslint' ),
        configuration: 'tslint.json',
        formatter: 'verbose' }
        } ) {

        this.options = options;

        if ( _isUndefined( this.options.src ) ) {
            throw new Error( 'TSlintTask: src é obrigatório!' );
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

        let lintConfig = this.options.lintConfig;

        gulp.task( this.options.taskName, taskMetadata.description, this.options.taskDeps, () => {

            let chain = this.options.base ? gulp.src( this.options.src, { base: this.options.base } ) : gulp.src( this.options.src );

            chain = chain.pipe( cached( this.options.taskName ) )
                         .pipe( plumber() )
                         .pipe( tslint( lintConfig ) )
                         .pipe( tslint.report() );

            if ( this.options.debug.active ) {
                chain = chain.pipe( debug( this.options.debug ) );
            }

            return chain;

        }, taskMetadata.options );
    }
}

export default TSlintTask;
