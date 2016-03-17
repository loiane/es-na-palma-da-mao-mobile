import jshint  from 'gulp-jshint';
import stylish from 'jshint-stylish';
import _isUndefined from 'lodash/isUndefined';
import debug from 'gulp-debug';

class JshintTask {
	setOptions(options) {
		this.options = options;

		if (_isUndefined(this.options.src)) {
			throw new Error('JshintTask: src is missing from configuration!');
		}
        
		return this;
	}

	defineTask(gulp) {
		let options = this.options;
        
        let taskMetadata = {
            description: 'Analiza arquivos .js com jshint e reporta resultado.',
            options: {
                options: {
                    src: 'Source (glob)',
                    dest: 'Destino (glob)',
                    debug: 'Indica se debug está habilitado para a task'
                }
            }
        };
        

		gulp.task(options.taskName, taskMetadata.description, options.taskDeps, () => {
			var chain = gulp.src(options.src);
            
            if (options.debug.active) {
                chain = chain.pipe(debug(options.debug));
            }
			
            return chain.pipe(jshint(options.jsHintConfig))
				        .pipe(jshint.reporter(stylish));
                        
		}, taskMetadata.options);
	}
}

export default JshintTask;
