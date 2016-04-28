// ES6 gulpfile
// ref: https://markgoodyear.com/2015/06/using-es6-with-gulp/
import innerGulp from 'gulp';
import gulpHelpers from './gulp/helpers';
import gulpHelp from 'gulp-help';
import runSequence from 'run-sequence';
import config from './config/gulp.config';

let gulp = gulpHelp( innerGulp ); // wrap in gulp help
let taskMaker = gulpHelpers.taskMaker( gulp );

/**
 * todo: yargs variables
 */
taskMaker.defineTask( 'css', {
    taskName: 'css',
    src: config.paths.css,
    dest: config.paths.output.client,
    debug: config.debugOptions
} );

taskMaker.defineTask( 'clean', {
    taskName: 'clean',
    src: config.paths.output.root,
    taskDeps: [ 'clean-e2e' ],
    debug: config.debugOptions
} );

taskMaker.defineTask( 'clean', {
    taskName: 'clean-e2e',
    src: config.paths.e2eOutput,
    debug: config.debugOptions
} );

taskMaker.defineTask( 'babel', {
    taskName: 'babel',
    src: config.paths.js.client,
    dest: config.paths.output.client,
    ngAnnotate: true,
    compilerOptions: config.babelOptions,
    debug: config.debugOptions
} );

taskMaker.defineTask( 'copy', {
    taskName: 'js',
    src: config.paths.js.server,
    dest: config.paths.output.server,
    debug: config.debugOptions
} );

/*taskMaker.defineTask( 'babel', {
 taskName: 'babel-e2e',
 src: config.paths.e2e,
 dest: config.paths.e2eOutput,
 compilerOptions: config.babelOptions,
 taskDeps: [ 'clean-e2e' ],
 debug: config.debugOptions
 } );*/

taskMaker.defineTask( 'copy', {
    taskName: 'html',
    src: config.paths.html,
    dest: config.paths.output.client,
    debug: config.debugOptions
} );

taskMaker.defineTask( 'copy', {
    taskName: 'systemConfig',
    src: config.paths.systemConfig,
    dest: config.paths.output.client,
    debug: config.debugOptions
} );

taskMaker.defineTask( 'copy', {
    taskName: 'assets',
    src: config.paths.assets,
    dest: config.paths.output.client,
    debug: config.debugOptions
} );

taskMaker.defineTask( 'copy', {
    taskName: 'json',
    src: config.paths.json,
    dest: config.paths.output.client,
    changed: { extension: '.json' },
    debug: config.debugOptions
} );

taskMaker.defineTask( 'copy', {
    taskName: 'index.html',
    src: config.paths.index.web,
    dest: config.paths.output.client,
    debug: config.debugOptions,
    rename: 'index.html'
} );

taskMaker.defineTask( 'copy', {
    taskName: 'index.mobile.html',
    src: config.paths.index.mobile,
    dest: config.paths.output.client,
    debug: config.debugOptions,
    rename: 'index.html'
} );

taskMaker.defineTask( 'copy', {
    taskName: 'cache-bust-index.html',
    src: config.paths.index,
    dest: config.paths.output.client,
    debug: config.debugOptions,
    rename: 'index.html',
    replace: config.cacheBustConfig
} );

taskMaker.defineTask( 'htmlMinify', {
    taskName: 'htmlMinify-index.html',
    taskDeps: [ 'cache-bust-index.html' ],
    src: config.paths.output.client,
    dest: config.paths.output.client,
    debug: config.debugOptions,
    minimize: config.htmlMinOptions
} );

taskMaker.defineTask( 'htmlHint', {
    taskName: 'html-hint',
    src: config.paths.html,
    debug: config.debugOptions
} );

taskMaker.defineTask( 'minify', {
    taskName: 'minify',
    src: config.paths.minify,
    dest: config.paths.output.client,
    debug: config.debugOptions
} );

taskMaker.defineTask( 'eslint', {
    taskName: 'eslint',
    src: config.paths.js.all,
    dest: './',
    debug: config.debugOptions
} );

taskMaker.defineTask( 'eslint', {
    taskName: 'eslint-src',
    src: config.paths.js.src,
    dest: './src/',
    debug: config.debugOptions
} );

taskMaker.defineTask( 'eslint', {
    taskName: 'eslint-gulp',
    src: config.paths.gulp,
    base: './',
    dest: './',
    debug: config.debugOptions
} );

taskMaker.defineTask( 'watch', {
    taskName: 'watch',
    src: config.paths.watch,
    tasks: [ 'compile', 'index.html', 'eslint-src' ]
} );

taskMaker.defineTask( 'nodemon', {
    taskName: 'serve',
    browserSyncConfig: config.browserSyncConfig,
    nodemonConfig: config.nodemonConfig
} );

gulp.task( 'compile', 'Compila a aplicação executando: [css, html, babel, json, assets, systemConfig] tasks paralelamente.', function( callback ) {
    return runSequence( [
        'css', 'html', 'js', 'babel', 'json', 'assets', 'systemConfig'
    ], callback );
} );

gulp.task( 'recompile', 'Limpa diretório destino e compila aplicação.', function( callback ) {
    return runSequence( 'clean', [ 'compile' ], callback );
} );

gulp.task( 'run:web', 'Executa a aplicação web no ambiente configurado: dev, prod, etc.', function( callback ) {
    if ( config.situation.isProduction() ) {
        return runSequence( 'recompile', 'routeBundler', 'cache-bust-index.html', 'htmlMinify-index.html', 'minify', 'serve', callback );
    } else if ( config.situation.isDevelopment() ) {
        return runSequence( 'recompile', 'eslint-src', 'index.html', 'serve', 'watch', callback );
    }
} );

gulp.task( 'run:mobile', 'Executa a aplicação mobile no ambiente configurado: dev, prod, etc.', function( callback ) {
    return runSequence( 'recompile', 'eslint-src', 'index.mobile.html', callback );
} );

// executa a tarefa default
gulp.task( 'default', 'Executa task \'run\'', [ 'run' ] );
