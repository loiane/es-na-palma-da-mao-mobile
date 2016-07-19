import plumber from 'gulp-plumber';
import cache from 'gulp-cached';
import changed from 'gulp-changed';
import toES5 from 'gulp-babel';
import uglify from 'gulp-uglify';
import htmlMin from 'gulp-htmlmin';
import ngHtml2Js from 'gulp-ng-html2js';
import insert from 'gulp-insert';
import _isUndefined from 'lodash/isUndefined';
import _merge from 'lodash/merge';
import _forEach from 'lodash/forEach';
import debug from 'gulp-debug';
import { compilerOptions } from './babel';

let defaultUglifyOptions = {
    mangle: true
};

let defaultHtmlMinOptions = {
    keepClosingSlash: true
};

class NgHtml2JsTask {
    setOptions( options ) {
        this.options = options;

        if ( _isUndefined( this.options.src ) ) {
            throw new Error( 'NgHtml2JsTask: src é obrigatório!' );
        }

        if ( _isUndefined( this.options.dest ) ) {
            throw new Error( 'NgHtml2JsTask: dest é obrigatório!' );
        }

        if ( _isUndefined( this.options.prepend ) ) {
            this.options.prepend = 'import angular from \'angular\';\n';
        }

        this.options.ngHtml2Js = _merge( {}, { export: 'system' }, this.options.ngHtml2Js );
        this.options.compilerOptions = _merge( {}, compilerOptions, this.options.compilerOptions );
        this.options.uglifyOptions = _merge( {}, defaultUglifyOptions, this.options.uglifyOptions );
        this.options.minimize = _merge( {}, defaultHtmlMinOptions, this.options.minimize );

        return this;
    }

    defineTask( gulp ) {
        let options = this.options;

        let taskMetadata = {
            description: 'Converte html em js(angular modules) e salva em $templateCache.',
            options: {
                options: {
                    src: 'Source (glob)',
                    dest: 'Destino (glob)',
                    debug: 'Indica se debug está habilitado para a task',
                    ngHtml2Js: 'Opções para o plugin gulp-ng-html2Js',
                    compilerOptions: 'Opções para o plugin gulp-babel',
                    uglifyOptions: 'Opções para o plugin gulp-uglify',
                    minimize: 'Opções para o plugin gulp-htmlmin'
                }
            }
        };

        gulp.task( options.taskName, taskMetadata.description, options.taskDeps, () => {
            let chain;

            chain = gulp.src( options.src );

            if ( options.debug.active ) {
                chain = chain.pipe( debug( options.debug ) );
            }

            chain = chain.pipe( cache( options.taskName ) )
                         .pipe( plumber() )
                         .pipe( changed( options.dest, { extension: '.html' } ) )
                         .pipe( gulp.dest( options.dest ) ) // salva no formato .html
                         .pipe( htmlMin( options.minimize ) )
                         .pipe( ngHtml2Js( options.ngHtml2Js ) )
                         .pipe( insert.prepend( options.prepend ) )
                         .pipe( toES5( options.compilerOptions ) ); // salva no formato .html

            if ( options.uglify ) {
                chain = chain.pipe( uglify( options.uglifyOptions ) );
            }

            chain = chain.pipe( gulp.dest( options.dest ) ); // salva html convertido para .js

            _forEach( options.globalBrowserSyncs, ( bs ) => {
                chain = chain.pipe( bs.stream() );
            } );

            return chain;
        }, taskMetadata.options );
    }
}

export default NgHtml2JsTask;
