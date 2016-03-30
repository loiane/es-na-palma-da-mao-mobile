import _isUndefined from 'lodash/isUndefined';
import _merge from 'lodash/merge';
import eslint from 'gulp-eslint';
import plumber from 'gulp-plumber';
import debug from 'gulp-debug';
import cached from 'gulp-cached';
import gIf from 'gulp-if';
/**
* ESLint Task.
*
* Mais em: http://eslint.org/
* 
* @returns {void}
*/
class EslintTask {
    setOptions(options) {
        this.options = options;

        this.options.lintConfig = _merge({ quiet: true, fix: true, failOnError: false }, this.options.lintConfig || {});

        if (this.options.lintConfig.failOnError && this.options.lintConfig.failAfterError) {
            throw new Error('EslintTask: Please choose either failOnError or failAfterError option!');
        }

        if (_isUndefined(this.options.src)) {
            throw new Error('EslintTask: src is missing from configuration!');
        }

        return this;
    }

    defineTask(gulp) {

        let lintConfig = this.options.lintConfig;

        // O ESlint corrigiu o conteúdo do arquivo?
        function isFixed( file ) {
            return file.eslint != null && file.eslint.fixed;
        }

        gulp.task(this.options.taskName, this.options.taskDeps, () => {

            var chain = gulp.src( this.options.src )
                            .pipe( cached( this.options.taskName) )
                            .pipe( plumber() )
                            .pipe( eslint(lintConfig ) )
                            .pipe( eslint.format() );

            if ( this.options.debug.active ) {
                chain = chain.pipe( debug( this.options.debug ) );
            }

            // só escreve no arquivo se tiver sido "fixed"
            // ref: https://github.com/adametry/gulp-eslint/blob/master/example/fix.js
            chain = chain.pipe( gIf( isFixed, gulp.dest( this.options.dest ) ) );

            if ( lintConfig.failOnError ) {
                chain = chain.pipe( $.eslint.failOnError() );
            } else if ( lintConfig.failAfterError ) {
                chain = chain.pipe( $.eslint.failAfterError() );
            }

            //var chain = gulp.src(options.src).pipe(eslint());

            //if (options.quiet) {
            //	chain = chain.pipe(eslint.format((reports) => {
            //		reports.forEach((report) => {
            //			report.messages = report.messages.filter((message) => {
            //				return message.fatal || message.severity > 1;
            //			});
            //		});
            //		return '( *** Eslint runs in quite mode *** )';
            //	}));
            //}

            //chain = chain.pipe(eslint.format());

            //if (options.failOnError) {
            //	chain = chain.pipe(eslint.failOnError());
            //} else if (options.failAfterError) {
            //	chain = chain.pipe(eslint.failAfterError());
            //}

            //return chain;
        });
    }
}

export default EslintTask;
