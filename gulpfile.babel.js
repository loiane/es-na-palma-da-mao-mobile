// ES6 gulpfile
// ref: https://markgoodyear.com/2015/06/using-es6-with-gulp/
import innerGulp from 'gulp';
import gulpHelpers from './gulp/helpers';
import gulpHelp from 'gulp-help';
import yargs from 'yargs';
import runSequence from 'run-sequence';
import config from './config/gulp.config';

let gulp = gulpHelp( innerGulp ); // wrap in gulp help
let taskMaker = gulpHelpers.taskMaker( gulp );

// args
let argv = yargs.argv;

//let platform = argv.platform;
//let isMobile = platform === 'mobile';
//let isWeb = platform === 'web';

/**
 * todo: yargs variables
 */
taskMaker.defineTask( 'css', {
    taskName: 'css',
    src: config.paths.css,
    dest: config.paths.output.app,
    debug: config.debugOptions
} );

taskMaker.defineTask( 'clean', {
    taskName: 'clean',
    src: config.paths.output.app,
    taskDeps: [ 'clean-e2e' ],
    debug: config.debugOptions
} );

taskMaker.defineTask( 'clean', {
    taskName: 'clean-e2e',
    src: config.paths.e2eOutput,
    debug: config.debugOptions
} );

taskMaker.defineTask( 'babel', {
    taskName: 'transpile-client-js',
    src: config.paths.js.client,
    dest: config.paths.output.app,
    ngAnnotate: true,
    compilerOptions: config.babelOptions,
    debug: config.debugOptions
} );

taskMaker.defineTask( 'copy', {
    taskName: 'client-js',
    src: config.paths.js.client,
    dest: config.paths.output.app,
    debug: config.debugOptions
} );

taskMaker.defineTask( 'copy', {
    taskName: 'server-js',
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
    dest: config.paths.output.app,
    debug: config.debugOptions
} );

taskMaker.defineTask( 'copy', {
    taskName: 'systemConfig',
    src: config.paths.systemConfig,
    dest: config.paths.output.app,
    debug: config.debugOptions
} );

taskMaker.defineTask( 'copy', {
    taskName: 'systemExtensions',
    src: config.paths.systemExtensions,
    dest: config.paths.output.app,
    debug: config.debugOptions
} );

taskMaker.defineTask( 'copy', {
    taskName: 'system.yuml',
    src: config.paths.systemYuml,
    dest: config.paths.output.app,
    debug: config.debugOptions
} );

taskMaker.defineTask( 'copy', {
    taskName: 'assets',
    src: config.paths.assets,
    dest: config.paths.output.app,
    debug: config.debugOptions
} );

taskMaker.defineTask( 'copy', {
    taskName: 'json',
    src: config.paths.json,
    dest: config.paths.output.app,
    changed: { extension: '.json' },
    debug: config.debugOptions
} );

taskMaker.defineTask( 'copy', {
    taskName: 'index-web.html',
    src: config.paths.index.web,
    dest: config.paths.output.app,
    debug: config.debugOptions,
    rename: 'index.html'
} );

taskMaker.defineTask( 'copy', {
    taskName: 'index-mobile.html',
    src: config.paths.index.mobile,
    dest: config.paths.output.root,
    debug: config.debugOptions,
    rename: 'index.html'
} );

taskMaker.defineTask( 'copy', {
    taskName: 'cache-bust-index.html',
    src: config.paths.index,
    dest: config.paths.output.app,
    debug: config.debugOptions,
    rename: 'index.html',
    replace: config.cacheBustConfig
} );

taskMaker.defineTask( 'htmlMinify', {
    taskName: 'htmlMinify-index.html',
    taskDeps: [ 'cache-bust-index.html' ],
    src: config.paths.output.app,
    dest: config.paths.output.app,
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
    dest: config.paths.output.app,
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
    tasks: [ 'compile' ]
} );

taskMaker.defineTask( 'nodemon', {
    taskName: 'serve',
    browserSyncConfig: config.browserSyncConfig,
    nodemonConfig: config.nodemonConfig
} );

gulp.task( 'compile', 'Compila a aplicação executando: [css, html, babel, json, assets, systemConfig, systemExtensions] tasks paralelamente.', function() {
    let tasks = [
        'css',
        'html',
        'index-web.html',
        'index-mobile.html',
        'server-js',
        'json',
        'assets',
        'systemConfig',
        'systemExtensions',
        'system.yuml'
    ];

    // Se flag argv.transpile seja informado, realiza o transpile do js e copia o resultado para
    // a pasta de onde a app será executada. Caso argv.transpile NÃO seja informado, copia o código
    // js como está a "transpilation" será delegada automaticamente para o systemJS, o que é bom
    // em tempo de desenvolvimento mas que aumenta significativamente número e o tamanho das
    // requisições.
    if ( argv.transpile ) {
        tasks.push( 'transpile-client-js' );
    } else {
        tasks.push( 'client-js' );
    }

    return runSequence.apply( this, tasks );
} );

gulp.task( 'recompile', 'Limpa diretório destino e compila aplicação.', function() {
    return runSequence( 'clean', [ 'compile' ] );
} );

gulp.task( 'build', 'Executa a aplicação web no ambiente de desenvolvimento', function() {

    let tasks = [ 'recompile' ];

    if ( argv.serve ) {
        tasks.push( 'serve' );
    }

    if ( argv.watch ) {
        tasks.push( 'watch' );
    }

    return runSequence.apply( this, tasks );
} );

// executa a tarefa default
gulp.task( 'default', 'Executa task \'build\'', [ 'build' ] );

/*gulp.task( 'build', 'Executa a aplicação web no ambiente configurado: dev, prod, etc.', function() {
 if ( config.situation.isProduction() ) {
 runSequence( 'recompile', 'routeBundler', 'cache-bust-index.html', 'htmlMinify-index.html', 'minify', 'serve' );
 } else if ( config.situation.isDevelopment() ) {

 let tasks = [ 'recompile' ];

 if ( isWeb && serve ) {
 tasks.push( 'serve' );
 }

 if ( watch ) {
 tasks.push( 'watch' );
 }

 return runSequence.apply( this, tasks );
 }
 } );*/
