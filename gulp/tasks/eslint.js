import _isUndefined from 'lodash/isUndefined';
import _merge from 'lodash/merge';
import eslint from 'gulp-eslint';
import plumber from 'gulp-plumber';
import debug from 'gulp-debug';
import cached from 'gulp-cached';
import gIf from 'gulp-if';

let taskMetadata = {
    description: 'Realiza uma análize de qualdade de código Javascript usando [ESLint](http://eslint.org/) e reporta o resultado.',
    options: {
        options: {
            src: 'Source (glob)',
            dest: 'Destino (glob)',
            debug: 'Indica se debug está habilitado para a task',
            lintConfig: 'Opções para o plugin gulp-eslint'
        }
    }
};

/**
 * ESLint Task.
 *
 * Mais em: http://eslint.org/
 *
 * @returns {void}
 */
class EslintTask {

    /**
     * Configura a task
     *
     * @param {Object} options - opções de configuração passadas para a Task
     *
     * @returns {EslintTask} - A própria instância de EslintTask
     */
    setOptions( options ) {
        this.options = options;

        this.options.lintConfig = _merge( {
            quiet: false,
            fix: true,
            failOnError: false
        }, this.options.lintConfig || {} );

        if ( this.options.lintConfig.failOnError && this.options.lintConfig.failAfterError ) {
            throw new Error( 'EslintTask: Por favor escolha somente uma das opções: failOnError ou failAfterError!' );
        }

        if ( _isUndefined( this.options.src ) ) {
            throw new Error( 'EslintTask: src é obrigatório!' );
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

        /**
         * O ESlint corrigiu o conteúdo do arquivo?
         *
         * @param {Object} file - vinylFile representando o arquivo
         *
         * @returns {boolean} - Um bool indicando se o ESlint corrigiu o conteúdo do arquivo
         */
        function isFixed( file ) {
            return file.eslint !== null && file.eslint.fixed;
        }

        gulp.task( this.options.taskName, taskMetadata.description, this.options.taskDeps, () => {

            let chain = this.options.base ? gulp.src( this.options.src, { base: this.options.base } ) : gulp.src( this.options.src );

            chain = chain.pipe( cached( this.options.taskName ) )
                         .pipe( plumber() )
                         .pipe( eslint( lintConfig ) )
                         .pipe( eslint.format() );

            if ( this.options.debug.active ) {
                chain = chain.pipe( debug( this.options.debug ) );
            }

            // só escreve no arquivo se tiver sido "fixed"
            // ref: https://github.com/adametry/gulp-eslint/blob/master/example/fix.js
            chain = chain.pipe( gIf( isFixed, gulp.dest( this.options.dest ) ) );

            if ( lintConfig.failOnError ) {
                chain = chain.pipe( eslint.failOnError() );
            } else if ( lintConfig.failAfterError ) {
                chain = chain.pipe( eslint.failAfterError() );
            }

            return chain;

        }, taskMetadata.options );
    }
}

export default EslintTask;
