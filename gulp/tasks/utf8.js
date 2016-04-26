import convertEncoding from 'gulp-convert-encoding';
import header from 'gulp-header';
import debug from 'gulp-debug';
import plumber from 'gulp-plumber';
import _isUndefined from 'lodash/isUndefined';

class Utf8Task {
    setOptions( options ) {
        this.options = options;

        if ( _isUndefined( this.options.src ) ) {
            throw new Error( 'Utf8Task: src é obrigatório!' );
        }

        if ( _isUndefined( this.options.dest ) ) {
            throw new Error( 'Utf8Task: dest é obrigatório!' );
        }

        return this;
    }

    defineTask( gulp ) {
        let options = this.options;

        let taskMetadata = {
            description: 'Converte arquivos para UTF8',
            options: {
                options: {
                    src: 'Source (glob)',
                    dest: 'Destino (glob)',
                    debug: 'Indica se debug está habilitado para a task'
                }
            }
        };

        gulp.task( options.taskName, taskMetadata.description, options.taskDeps, () => {
            let chain = gulp.src( options.src )
                            .pipe( plumber() )
                            .pipe( convertEncoding( { to: 'utf8' } ) )
                            .pipe( header( '\ufeff' ) ); //http://stackoverflow.com/questions/29830563/encoding-problems-with-gulp-on-windows#answer-31004780

            if ( options.debug.active ) {
                chain = chain.pipe( debug( options.debug ) );
            }

            chain = chain.pipe( gulp.dest( options.dest ) );

            return chain;
        }, taskMetadata.options );
    }
}

export default Utf8Task;
