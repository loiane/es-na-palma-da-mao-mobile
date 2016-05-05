/* eslint no-invalid-this: 1*/
// ES6 gulpfile
// ref: https://markgoodyear.com/2015/06/using-es6-with-gulp/
import innerGulp from 'gulp';
import path from 'path';
import gulpHelp from 'gulp-help';
import yargs from 'yargs';
import open from 'open';
import runSequence from 'run-sequence';
import spawn from 'win-spawn';
import gulpHelpers from './gulp/helpers';
import config from './config/gulp.config';

const gulp = gulpHelp( innerGulp ); // wrap in gulp help
const taskMaker = gulpHelpers.taskMaker( gulp );
const environment = gulpHelpers.environment();

/**
 * Realiza o parse dos argumentos da linha de comando
 */
let argv = yargs.alias( 't', 'transpile' )
                .alias( 'w', 'watch' )
                .alias( 's', 'serve' )
                .alias( 'e', 'emulate' )
                .alias( 'r', 'run' )
                .alias( 'c', 'cacheBust' )
                .alias( 'h', 'htmlmin' )
                .alias( 'j', 'jsmin' )
                .default( 'cacheBust', false )
                .default( 'jsmin', false )
                .default( 'htmlmin', false )
                .default( 'watch', false )
                .default( 'emulate', false )
                .default( 'run', false )
                .default( 'serve', false )
                .default( 'transpile', false ).argv;

/**
 * Executa um comando do ionic. Pressupõe o ionic instalado localmente.
 *
 * @param {String} command - O comando do Ionic CLI sendo executado
 * @param {String[]} args - Array de strings contendo os argumentos para command
 * @param {Function} cb - Callback a ser executado quando o command finalizar
 *
 * @returns {void}
 */
const ionic = ( command, args, cb ) => {

    const script = path.resolve( './node_modules/ionic/bin/', 'ionic' );
    const flags = process.argv.splice( 3 );
    const ionicArgs = [ command ].concat( args || [] ).concat( flags );

    const child = spawn( script, ionicArgs, { stdio: 'inherit' } );

    child.on( 'close', ( code ) => {
        cb( !!code );
    } );
};

gulp.task( 'ionic:serve', ( cb ) => {
    ionic( 'serve', [ '--flag' ], cb );
} );

gulp.task( 'ionic:emulate', ( cb ) => {

    if ( argv.emulate === true ) {
        argv.emulate = 'android'; // usa android por default
    }

    ionic( `emulate ${argv.emulate}`, [ '--livereload', '--consolelogs' ], cb );
} );

gulp.task( 'ionic:run', ( cb ) => {

    if ( argv.run === true ) {
        argv.run = 'android'; // usa android por default
    }

    ionic( `run ${argv.run}`, [], cb );
} );

taskMaker.defineTask( 'css', {
    taskName: 'css',
    src: config.paths.css,
    dest: config.paths.output.root,
    debug: config.debugOptions
} );

taskMaker.defineTask( 'clean', {
    taskName: 'clean',
    src: config.paths.output.temp,
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
    dest: config.paths.output.root,
    ngAnnotate: true,
    compilerOptions: config.babelOptions,
    debug: config.debugOptions
} );

taskMaker.defineTask( 'copy', {
    taskName: 'client-js',
    src: config.paths.js.client,
    dest: config.paths.output.root,
    changed: { extension: '.js' },
    debug: config.debugOptions
} );

taskMaker.defineTask( 'copy', {
    taskName: 'server-js',
    src: config.paths.js.server,
    dest: config.paths.output.server,
    changed: { extension: '.js' },
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
    dest: config.paths.output.root,
    changed: { extension: '.html' },
    debug: config.debugOptions
} );

taskMaker.defineTask( 'copy', {
    taskName: 'systemConfig',
    src: config.paths.systemConfig,
    dest: config.paths.output.root,
    changed: { extension: '.js' },
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
    dest: config.paths.output.root,
    changed: { extension: '.js' },
    debug: config.debugOptions
} );

taskMaker.defineTask( 'copy', {
    taskName: 'assets',
    src: config.paths.assets,
    dest: config.paths.output.root,
    debug: config.debugOptions
} );

taskMaker.defineTask( 'copy', {
    taskName: 'json',
    src: config.paths.json,
    dest: config.paths.output.root,
    changed: { extension: '.json' },
    debug: config.debugOptions
} );

taskMaker.defineTask( 'copy', {
    taskName: 'index-web.html',
    src: config.paths.index.web.src,
    dest: config.paths.output.root,
    rename: 'index.html',
    changed: { extension: '.html' },
    debug: config.debugOptions
} );

taskMaker.defineTask( 'copy', {
    taskName: 'index-mobile.html',
    src: config.paths.index.mobile.src,
    dest: config.paths.output.root,
    rename: 'index.mobile.html',
    changed: { extension: '.html' },
    debug: config.debugOptions
} );

taskMaker.defineTask( 'copy', {
    taskName: 'cache-bust-index-web.html',
    src: config.paths.index.web.src,
    dest: config.paths.output.root,
    rename: 'index.html',
    replace: config.cacheBustConfig,
    changed: { extension: '.html' },
    debug: config.debugOptions
} );

taskMaker.defineTask( 'htmlMinify', {
    taskName: 'htmlmin',
    src: config.paths.html,
    dest: config.paths.output.root,
    debug: config.debugOptions,
    minimize: config.htmlMinOptions
} );

taskMaker.defineTask( 'htmlHint', {
    taskName: 'html-hint',
    src: config.paths.html,
    debug: config.debugOptions
} );

taskMaker.defineTask( 'minify', {
    taskName: 'jsmin',
    src: config.paths.js.output,
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
    taskName: 'nodemon',
    browserSyncConfig: config.browserSyncConfig,
    nodemonConfig: config.nodemonConfig
} );

// no-op = empty function
gulp.task( 'noop', ( cb ) => {
    cb();
} );

gulp.task( 'serve', 'Serve a aplicação através de web server', [ 'nodemon' ], () => {
    const appBaseUrl = `http://localhost:${config.browserSyncConfig.port}`;
    open( `${appBaseUrl}/index.html` );
    open( `${appBaseUrl}/index.mobile.html` );
} );

gulp.task( 'compile', 'Compila a aplicação e copia o resultado para a pasta de distribuição.', ( cb ) => {

    // Se flag argv.transpile seja informado, realiza o transpile do js e copia o resultado para
    // a pasta de onde a app será executada. Caso argv.transpile NÃO seja informado, copia o código
    // js como está a "transpilation" será delegada automaticamente para o systemJS, o que é bom
    // em tempo de desenvolvimento mas que aumenta significativamente número e o tamanho das
    // requisições.

    const transpile = argv.transpile || environment.isProduction();
    const cacheBust = argv.cacheBust || environment.isProduction();
    const jsmin = argv.jsmin || environment.isProduction();
    const htmlmin = argv.htmlmin || environment.isProduction();

    // tasks que transformam/copiam arquivos para a pasta de distribuição
    let compileTasks = [
        'eslint-src',
        'css',
        'json',
        'assets',
        'systemConfig',
        'system.yuml',
        'server-js',
        'index-mobile.html',
        cacheBust ? 'cache-bust-index-web.html' : 'index-web.html',
        transpile ? 'transpile-client-js' : 'client-js',
        htmlmin ? 'htmlmin' : 'html'
    ];

    // tasks executadas nos arquivos copiados na pasta de distribuição.
    if ( jsmin ) {
        compileTasks.push( [ 'jsmin' ] );
    }

    compileTasks.push( cb );   // adiciona callback no fim de copy tasks

    runSequence.apply( null, compileTasks );
} );

gulp.task( 'recompile', 'Limpa diretório destino e compila aplicação.', ( cb ) => {
    runSequence( 'clean', [ 'compile' ], cb );
} );

gulp.task( 'run', 'Executa a aplicação', ( cb ) => {
    if ( environment.isProduction() ) {
        runSequence( 'recompile', 'serve', cb );
    } else if ( environment.isDevelopment() ) {

        let serveTasks = [ 'noop' ];

        if ( argv.emulate ) {
            serveTasks.push( 'ionic:emulate' );
        }

        if ( argv.run ) {
            serveTasks.push( 'ionic:run' );
        }

        if ( argv.serve ) {
            serveTasks.push( 'serve' );
        }

        runSequence( 'recompile', serveTasks, argv.watch ? 'watch' : 'noop', cb );
    }
} );

gulp.task( 'default', 'Executa task \'run\'', [ 'run' ] );

