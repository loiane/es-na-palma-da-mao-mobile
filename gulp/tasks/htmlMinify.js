import htmlMin from 'gulp-htmlmin';
import plumber from 'gulp-plumber';
import _isUndefined from 'lodash/isUndefined';
import _merge from 'lodash/merge';
import debug from 'gulp-debug';

class HtmlMinifyTask {
    setOptions(options) {
        this.options = options;

        if (_isUndefined(this.options.src)) {
            throw new Error('HtmlMinifyTask: src is missing from configuration!');
        }

        if (_isUndefined(this.options.dest)) {
            throw new Error('HtmlMinifyTask: dest is missing from configuration!');
        }

        this.options.minimize = _merge({
            keepClosingSlash: true
        }, this.options.minimize);

        return this;
    }

    defineTask(gulp) {
        let options = this.options;
        
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
        
        gulp.task(options.taskName,taskMetadata.description,  options.taskDeps, () => {
            let chain = gulp.src(options.src);

            if (options.debug.active) {
                chain = chain.pipe(debug(options.debug));
            }
            chain = chain.pipe(plumber())
                         .pipe(htmlMin(options.minimize))
                         .pipe(gulp.dest(options.dest));

            return chain;
        }, taskMetadata.options);
    }
}

export default HtmlMinifyTask;
