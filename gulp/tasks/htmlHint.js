import htmlhint from 'gulp-htmlhint';
import plumber from 'gulp-plumber';
import _isUndefined from 'lodash/isUndefined';
import debug from 'gulp-debug';

class HtmlHintTask {
    setOptions(options) {
        this.options = options;

        if (_isUndefined(this.options.src)) {
            throw new Error('HtmlHintTask: src is missing from configuration!');
        }
        return this;
    }

    defineTask(gulp) {
        let options = this.options;
        
        let taskMetadata = {
            description: 'Analiza arquivos .html com htmlhint e reporta resultado.',
            options: {
                options: {
                    src: 'Arquivos source (glob)',
                    debug: 'Indica se debug está habilitado para a task'
                }
            }
        };
        
        gulp.task(options.taskName, taskMetadata.description,  options.taskDeps, () => {
            let chain = gulp.src(options.src);

            if (options.debug.active) {
                chain = chain.pipe(debug(options.debug));
            }
            chain = chain.pipe(plumber())
                         .pipe(htmlhint('.htmlhintrc'))
                         .pipe(htmlhint.reporter())

            return chain;
        }, taskMetadata.options);
    }
}

export default HtmlHintTask;
