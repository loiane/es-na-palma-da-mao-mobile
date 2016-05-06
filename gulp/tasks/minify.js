import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import plumber from 'gulp-plumber';
import chmod from 'gulp-chmod';
import _isUndefined from 'lodash/isUndefined';
import _merge from 'lodash/merge';
import debug from 'gulp-debug';
import cache from 'gulp-cached';
import changed from 'gulp-changed';

let defaultUglifyOptions = {
    mangle: true
};

/**
 * Metadados usados para descrever a task
 *
 * @type {{description: string, options: {options: {src: string, dest: string, debug: string, uglifyOptions: string}}}}
 */
let taskMetadata = {
    description: 'Minimiza arquivos .js.',
    options: {
        options: {
            src: 'Source (glob)',
            dest: 'Destino (glob)',
            debug: 'Indica se debug está habilitado para a task',
            uglifyOptions: 'Opções para o plugin gulp-uglify',
            changed: 'Opções para plugin gulp-changed'
        }
    }
};

/**
 * @class
 */
class MinifyTask {

    /**
     * Configura a task
     *
     * @param {Object} options - opções de configuração passadas para a Task
     *
     * @returns {MinifyTask} - A própria instância de MinifyTask
     */
    setOptions( options ) {
        this.options = options;

        if ( _isUndefined( this.options.src ) ) {
            throw new Error( 'MinifyTask: src é obrigatório!' );
        }

        if ( _isUndefined( this.options.dest ) ) {
            throw new Error( 'MinifyTask: dest é obrigatório!' );
        }

        this.options.uglifyOptions = _merge( {}, defaultUglifyOptions, options.uglifyOptions );

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
                            .pipe( plumber() )
                            .pipe( sourcemaps.init( { loadMaps: true } ) )
                            .pipe( uglify( options.uglifyOptions ) )
                            .pipe( sourcemaps.write( '.' ) );

            if ( options.changed ) {
                chain = chain.pipe( changed( options.dest, options.changed ) );
            }

            if ( !_isUndefined( options.chmod ) ) {
                chain = chain.pipe( chmod( options.chmod ) );
            }

            if ( options.debug.active ) {
                chain = chain.pipe( debug( options.debug ) );
            }

            return chain.pipe( gulp.dest( options.dest ) );
        }, taskMetadata.options );
    }
}

export default MinifyTask;
