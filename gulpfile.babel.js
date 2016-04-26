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
    src: config.path.css,
    dest: config.path.outputClient,
    debug: config.debugOptions
} );

taskMaker.defineTask( 'clean', {
    taskName: 'clean',
    src: config.path.output,
    taskDeps: [ 'clean-e2e' ],
    debug: config.debugOptions
} );

taskMaker.defineTask( 'clean', {
    taskName: 'clean-e2e',
    src: config.path.e2eOutput,
    debug: config.debugOptions
} );

taskMaker.defineTask( 'babel', {
    taskName: 'babel',
    src: config.path.clientJs,
    dest: config.path.outputClient,
    ngAnnotate: true,
    compilerOptions: config.babelOptions,
    debug: config.debugOptions
} );

taskMaker.defineTask( 'copy', {
    taskName: 'js',
    src: config.path.serverJs,
    dest: config.path.outputServer,
    debug: config.debugOptions
} );

/*taskMaker.defineTask( 'babel', {
 taskName: 'babel-e2e',
 src: config.path.e2e,
 dest: config.path.e2eOutput,
 compilerOptions: config.babelOptions,
 taskDeps: [ 'clean-e2e' ],
 debug: config.debugOptions
 } );*/

taskMaker.defineTask( 'copy', {
    taskName: 'html',
    src: config.path.html,
    dest: config.path.outputClient,
    debug: config.debugOptions
} );

taskMaker.defineTask( 'copy', {
    taskName: 'systemConfig',
    src: config.path.systemConfig,
    dest: config.path.outputClient,
    debug: config.debugOptions
} );

taskMaker.defineTask( 'copy', {
    taskName: 'assets',
    src: config.path.assets,
    dest: config.path.outputClient,
    debug: config.debugOptions
} );

taskMaker.defineTask( 'copy', {
    taskName: 'json',
    src: config.path.json,
    dest: config.path.outputClient,
    changed: { extension: '.json' },
    debug: config.debugOptions
} );

taskMaker.defineTask( 'copy', {
    taskName: 'index.html',
    src: config.path.index,
    dest: config.path.outputClient,
    debug: config.debugOptions,
    rename: 'index.html'
} );
taskMaker.defineTask( 'copy', {
    taskName: 'cache-bust-index.html',
    src: config.path.index,
    dest: config.path.output,
    debug: config.debugOptions,
    rename: 'index.html',
    replace: config.cacheBustConfig
} );

taskMaker.defineTask( 'htmlMinify', {
    taskName: 'htmlMinify-index.html',
    taskDeps: [ 'cache-bust-index.html' ],
    src: config.path.output,
    dest: config.path.output,
    debug: config.debugOptions,
    minimize: config.htmlMinOptions
} );

taskMaker.defineTask( 'htmlHint', {
    taskName: 'html-hint',
    src: config.path.html,
    debug: config.debugOptions
} );

taskMaker.defineTask( 'minify', {
    taskName: 'minify',
    src: config.path.minify,
    dest: config.path.output,
    debug: config.debugOptions
} );

taskMaker.defineTask( 'eslint', {
    taskName: 'eslint',
    src: config.path.allJs,
    dest: './',
    debug: config.debugOptions
} );

taskMaker.defineTask( 'eslint', {
    taskName: 'eslint-src',
    src: config.path.srcJs,
    dest: './src/',
    debug: config.debugOptions
} );

taskMaker.defineTask( 'eslint', {
    taskName: 'eslint-gulp',
    src: config.path.gulp,
    base: './',
    dest: './',
    debug: config.debugOptions
} );

taskMaker.defineTask( 'watch', {
    taskName: 'watch',
    src: config.path.watch,
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

gulp.task( 'run', 'Executa a aplicação no ambiente configurado: dev, prod, etc.', function( callback ) {
    if ( config.situation.isProduction() ) {
        return runSequence( 'recompile', 'routeBundler', 'cache-bust-index.html', 'htmlMinify-index.html', 'minify', 'serve', callback );
    } else if ( config.situation.isDevelopment() ) {
        return runSequence( 'recompile', 'eslint-src', 'index.html', 'serve', 'watch', callback );
    }
} );

// executa a tarefa default
gulp.task( 'default', 'Executa task \'run\'', [ 'run' ] );
