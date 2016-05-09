/*
 eslint
 "no-invalid-this": 1,
 "angular/timeout-service": 0,
 "angular/definedundefined": 0,
 "angular/json-functions": 0,
 "no-unused-vars": 1
 */

// ES6 gulpfile
// ref: https://markgoodyear.com/2015/06/using-es6-with-gulp/
import bluebird from 'bluebird';
import innerGulp from 'gulp';
import gulpHelp from 'gulp-help';
import yargs from 'yargs';
import runSequence from 'run-sequence';
import gulpHelpers from './gulp/helpers';
import fs from 'fs';
import path from 'path';
import git from 'gulp-git';
import tap from 'gulp-tap';
import gutil from 'gulp-util';
import es from 'event-stream';
import concat from 'gulp-concat';
import order from 'gulp-order';
import gulpif from 'gulp-if';
import bump from 'gulp-bump';
import inquirer from 'inquirer';
import github from 'octonode';
import gulpExec from 'gulp-exec';
import config from './config/gulp.config';
import del from 'del';
import open from 'open';
import spawn from 'win-spawn';

const gulp = gulpHelp( innerGulp ); // wrap in gulp help
const taskMaker = gulpHelpers.taskMaker( gulp );
const environment = gulpHelpers.environment();
const Promise = bluebird;

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
    taskName: 'systemExtensions',
    src: config.paths.systemExtensions,
    dest: config.paths.output.root,
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
    taskName: 'eslint-src',
    src: config.paths.js.src,
    dest: './src',
    debug: config.debugOptions
} );

taskMaker.defineTask( 'eslint', {
    taskName: 'eslint',
    src: config.paths.js.all,
    dest: './',
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

/**
 * Lê um arquivo JSON
 *
 * @param {String} file - o path para o arquivo
 *
 * @returns {Object} - uma objeto JSON
 */
const readJsonFile = ( file ) => {
    return JSON.parse( fs.readFileSync( file ) );
};

/**
 * Adiciona novos 'src' ao pipeline do gulp
 *
 * @param {string} src - src para ser adicionado ao pipeline do gulp.
 * @returns {Stream} - uma gulp stream
 *
 * @example
 * gulp.src('')
 * .pipe(addSrc('CHANGELOG.md'))
 * .gulp.dest();
 */
const addSrc = ( src ) => {
    let pass = es.through();
    return es.duplex( pass, es.merge( gulp.src.apply( gulp.src, [ src ] ), pass ) );
};

gulp.task( 'bump', false, ( cb ) => {
    let bumpType = 'prerelease';

    if ( argv.patch ) {
        bumpType = 'patch';
    }
    if ( argv.minor ) {
        bumpType = 'minor';
    }
    if ( argv.major ) {
        bumpType = 'major';
    }
    if ( argv.prerelease ) {
        bumpType = 'prerelease';
    }
    bumpType = process.env.BUMP || bumpType;

    let version = argv.version;

    gulp.src( config.paths.packageJson )
        .pipe( gulpif( version !== undefined, bump( {
            version: version
        } ), bump( {
            type: bumpType
        } ) ) )
        .pipe( gulp.dest( './' ) )
        .on( 'end', () => {
            cb();
        } );
} );

gulp.task( 'commit', false, [ 'bump' ], () => {
    const pkg = readJsonFile( config.paths.packageJson );
    const message = `docs(changelog): version ${pkg.version}`;

    return gulp.src( config.paths.packageJson )
               .pipe( git.add( {
                   args: '.'
               } ) )
               .pipe( git.commit( message ) );
} );

gulp.task( 'tag', false, [ 'commit' ], ( cb ) => {
    const pkg = readJsonFile( config.paths.packageJson );
    const v = `v${pkg.version}`;
    const message = pkg.version;

    git.tag( v, message, ( err ) => {
        if ( err ) {
            throw new Error( err );
        }
        cb();
    } );
} );

gulp.task( 'push', false, [ 'tag' ], ( cb ) => {

    const branch = argv.branch || 'master';

    git.push( 'origin', branch, ( err ) => {
        if ( err ) {
            throw new Error( err );
        }
        cb();
    } );
} );

gulp.task( 'pushTags', false, [ 'push' ], ( cb ) => {

    const branch = argv.branch || 'master';

    // realiza um push e envia tags juntos
    git.push( 'origin', branch, { args: '--tags' }, ( err ) => {
        if ( err ) {
            throw new Error( err );
        }
        cb();
    } );
} );

gulp.task( 'release', 'Publica uma nova versão de release.', [ 'pushTags' ] );

// ********************* GITHUB SECTION *************************//
let client;

/**
 * Obtém o email(cadastrado no git) do usuário corrente
 *
 * @returns {Promise} - uma promise
 */
const getEmailAsync = Promise.promisify( git.exec.bind( git, {
    args: 'config --get user.email',
    quiet: false
} ) );

/**
 * Tenta obter o username de um usuário à partir de seu email no git.
 *
 * @param {String} email - o email do usuário no git
 *
 * @returns {Promise} - uma promise
 */
const getUsernameAsync = ( email ) => {
    return new Promise( ( resolve, reject ) => {
        const query = {
            q: `${email} in:email`
        };

        github.client()
              .get( '/search/users', query, ( err, res, body ) => {
                  if ( err ) {
                      reject( gutil.colors.red( `Error: ${err}` ) );
                  } else {
                      const user = body.items[ 0 ];
                      resolve( user ? user.login : null );
                  }
              } );
    } );
};

/**
 * Executa o prompt que pede ao usuário suas credenciais no github: username e password
 *
 * obs: Só exibe o prompt de username se um username não tiver sido fornecido.
 *
 * @param {String} [username] - O username do usuário
 *
 * @returns {Promise} - uma promise
 */
const prompCredentialsAsync = ( username ) => {
    return new Promise( ( resolve ) => {
        const questions = [
            {
                type: 'input',
                message: 'Digite seu username do github',
                name: 'username',
                default: username,
                validate: ( input ) => {
                    return input !== ''; // obrigatório
                },
                when: () => {
                    return !username; // Só exibe o prompt de username se um username não tiver sido fornecido.
                }
            }, {
                type: 'password',
                message: 'Digite sua senha do github',
                name: 'password',
                validate: ( input ) => {
                    return input !== ''; // obrigatório
                }
            }
        ];

        inquirer.prompt( questions, ( answers ) => {
            resolve( {
                username: answers.username || username,
                password: answers.password
            } );
        } );
    } );
};

/**
 * Autentica o usuário na api do github.
 *
 * @param {Object} tokenOrCredentials - Um token de autenticação ou as credenciais(login e senha)
 * informados pelo usuário
 *
 * @returns {Promise} - uma promise
 */
const authenticateAsync = ( tokenOrCredentials ) => {
    return new Promise( ( resolve, reject ) => {

        // cria client node para api do github, usando credenciais do usuário
        client = github.client( tokenOrCredentials );

        // tenta fazer um requisição que necessita de autenticação para poder verificar
        // o sucesso da mesma
        client.get( '/user', {}, ( err, status, body, headers ) => {
            if ( err ) {
                reject( `${gutil.colors.red( 'autenticação no github falhou! ' )} resposta do server: ${gutil.colors.yellow( err )}` );
            }
            resolve( gutil.colors.green( 'Autenticou no github com sucesso!' ) );
        } );
    } );
};

gulp.task( 'githubApi:authenticate', false, () => {
    const authToken = process.env.GITHUB_AUTH_TOKEN;

    if ( authToken ) {
        gutil.log( gutil.colors.blue( 'Autenticando no Github via token contido em "process.env.GITHUB_AUTH_TOKEN"' ) );
        return authenticateAsync( authToken ).tap( gutil.log );
    } else {
        return getEmailAsync().then( getUsernameAsync )
                              .then( prompCredentialsAsync )
                              .then( authenticateAsync )
                              .tap( gutil.log );
    }
} );

gulp.task( 'githubApi:createRelease', false, [ 'githubApi:authenticate' ], () => {
    const pkg = readJsonFile( config.paths.packageJson );
    const v = `v${pkg.version}`;
    const message = pkg.version;

    return gulp.src( config.paths.changelog )
               .pipe( tap( ( file ) => {

                   let releaseBody = file.contents.toString();

                   const release = {
                       'tag_name': v,
                       'name': `${v}: version ${message}`,
                       'body': releaseBody.slice( releaseBody.indexOf( '###' ) )
                   };

                   client.post( '/repos/prodest/es-na-palma-da-mao/releases', release, ( err, res, body ) => {
                       if ( err ) {
                           gutil.log( gutil.colors.red( `Error: ${err}` ) );
                       } else {
                           del( config.paths.changelog );
                       }
                   } );
               } ) );
} );

gulp.task( 'changelog', 'Gera um arquivo CHANGELOG.md.', ( cb ) => {
    const pkg = readJsonFile( config.paths.packageJson );
    const options = argv;
    const version = options.version || pkg.version;
    const from = options.from || '';

    gulp.src( '' )
        .pipe( gulpExec( `node ./gulp/helpers/changelog-script.js ${version} ${from}`, {
            pipeStdout: true
        } ) )
        .pipe( concat( 'updates.md' ) )
        .pipe( addSrc( 'CHANGELOG.md' ) )
        .pipe( order( [ 'updates.md', 'CHANGELOG.md' ] ) )
        .pipe( concat( 'CHANGELOG.md' ) )
        .pipe( gulp.dest( './' ) )
        .on( 'end', cb );
} );

gulp.task( 'delay', false, ( cb ) => {
    setTimeout( cb, 3000 );
} );

gulp.task( 'full-release', 'Publica uma nova release no Github e faz upload do changelog.', () => {
    return runSequence( 'changelog', 'release', 'delay', 'githubApi:createRelease' );
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
        'systemExtensions',
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

