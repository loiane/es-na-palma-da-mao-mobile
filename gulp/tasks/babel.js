import plumber from 'gulp-plumber';
import cache from 'gulp-cached';
import changed from 'gulp-changed';
import toES5 from 'gulp-babel';
import uglify from 'gulp-uglify';
import ngAnnotate from 'gulp-ng-annotate';
import _isUndefined from 'lodash/isUndefined';
import _merge from 'lodash/merge';
import _forEach from 'lodash/forEach';
import debug from 'gulp-debug';

let defaultCompilerOptions = {
    comments: false, //compact: true,
    presets: [ 'es2015' ]
};

let defaultUglifyOptions = {
    mangle: true
};

class BabelTask {
    setOptions( options ) {
        this.options = options;

        if ( _isUndefined( this.options.src ) ) {
            throw new Error( 'BabelTask: src é obrigatório!' );
        }

        if ( _isUndefined( this.options.dest ) ) {
            throw new Error( 'BabelTask: dest é obrigatório!' );
        }

        if ( this.options.notify ) {
            this.options.plumberOptions = this.options.defaultErrorHandler;
        }

        // Handle defaults
        this.options.compilerOptions = _merge( {}, defaultCompilerOptions, this.options.compilerOptions );
        this.options.ngAnnotateOptions = _merge( { sourceMap: true }, this.options.ngAnnotateOptions );
        this.options.plumberOptions = _merge( {}, this.options.plumberOptions );
        this.options.uglifyOptions = _merge( {}, defaultUglifyOptions, this.options.uglifyOptions );

        return this;
    }

    defineTask( gulp ) {
        let options = this.options;

        let taskMetadata = {
            description: 'Compila ES6 => ES5.',
            options: {
                options: {
                    src: 'Source (glob)',
                    dest: 'Destino (glob)',
                    plumberOptions: 'Opções para o plugin gulp-plumber',
                    compilerOptions: 'Opções para o plugin gulp-babel',
                    uglifyOptions: 'Opções para o plugin gulp-uglify',
                    ngAnnotate: 'Opções para o plugin gulp-ng-annotate',
                    debug: 'Indica se debug está habilitado para a task'
                }
            }
        };

        gulp.task( options.taskName, taskMetadata.description, options.taskDeps, () => {
            let chain = gulp.src( options.src );

            chain = chain
                .pipe( cache( options.taskName ) )
                .pipe( plumber( options.plumberOptions ) )
                .pipe( changed( options.dest, { extension: '.js' } ) );

            chain = chain.pipe( toES5( options.compilerOptions ) );

            if ( options.ngAnnotate ) {
                chain = chain.pipe( ngAnnotate( options.ngAnnotateOptions ) );
            }

            if ( options.uglify ) {
                chain = chain.pipe( uglify( options.uglifyOptions ) );
            }

            chain = chain.pipe( gulp.dest( options.dest ) );

            if ( options.debug.active ) {
                chain = chain.pipe( debug( options.debug ) );
            }
            _forEach( options.globalBrowserSyncs, ( bs ) => {
                chain = chain.pipe( bs.stream() );
            } );

            return chain;
        }, taskMetadata.options );
    }
}

export default BabelTask;
export let compilerOptions = defaultCompilerOptions;
