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
import spawn from 'win-spawn';
import semver from 'semver';
import Bundler from 'angular-lazy-bundler';
import typescript from 'gulp-typescript';
import sourcemaps from 'gulp-sourcemaps';
import karma from 'karma';
import cheerio from 'gulp-cheerio';

//import 'gulp-cordova-build-android';

const gulp = gulpHelp( innerGulp ); // wrap in gulp help
const taskMaker = gulpHelpers.taskMaker( gulp );
const environment = gulpHelpers.environment();
const Promise = bluebird;

//Android specific
const cordovaCreate = require( 'gulp-cordova-create' );
const android = require( 'gulp-cordova-build-android' );

/**
 * Realiza o parse dos argumentos da linha de comando
 */
let argv = yargs.alias( 't', 'transpile' )
                .alias( 'w', 'watch' )
                .alias( 's', 'serve' )
                .alias( 'e', 'emulate' )
                .alias( 'r', 'run' )
                .alias( 'h', 'htmlmin' )
                .alias( 'j', 'jsmin' )
                .alias( 'b', 'bundle' )
                .default( 'jsmin', false )
                .default( 'bundle', false )
                .default( 'htmlmin', false )
                .default( 'watch', false )
                .default( 'emulate', false )
                .default( 'run', false )
                .default( 'serve', false )
                .default( 'transpile', false ).argv;

let tsProject = typescript.createProject( 'tsconfig.json', {
    typescript: require( 'typescript' )
} );

////////////////////////////////////////// HELPERS /////////////////////////////////////////////////

/**
 * github api client
 */
let client;

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
 * Obtém o nome da branch atual
 *
 * @returns {Promise} - uma promise
 */
const getCurrentBranchAsync = Promise.promisify( git.exec.bind( git, {
    args: 'rev-parse --abbrev-ref HEAD',
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
        client.get( '/user', {}, ( err, status, body, headers ) => { //eslint-disable-line no-unused-vars
            if ( err ) {
                reject( `${gutil.colors.red( 'autenticação no github falhou! ' )} resposta do server: ${gutil.colors.yellow( err )}` );
            }
            resolve( gutil.colors.green( 'Autenticou no github com sucesso!' ) );
        } );
    } );
};

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

////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////// TASKS ////////////////////////////////////////////////////

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
    dest: config.paths.output.app,
    debug: config.debugOptions
} );

taskMaker.defineTask( 'clean', {
    taskName: 'clean',
    src: config.paths.output.temp,
    debug: config.debugOptions
} );

taskMaker.defineTask( 'babel', {
    taskName: 'transpile-app-js',
    src: config.paths.js.app,
    dest: config.paths.output.app,
    ngAnnotate: true,
    compilerOptions: config.babelOptions,
    debug: config.debugOptions
} );

taskMaker.defineTask( 'copy', {
    taskName: 'app-js',
    src: config.paths.js.app,
    dest: config.paths.output.app,
    changed: { extension: '.js' },
    debug: config.debugOptions
} );

taskMaker.defineTask( 'copy', {
    taskName: 'app-ts',
    src: config.paths.ts.app,
    dest: config.paths.output.app,
    changed: { extension: '.ts' },
    debug: config.debugOptions
} );

taskMaker.defineTask( 'copy', {
    taskName: 'html',
    src: config.paths.html,
    dest: config.paths.output.app,
    changed: { extension: '.html' },
    debug: config.debugOptions
} );

taskMaker.defineTask( 'copy', {
    taskName: 'packageJson',
    src: config.paths.packageJson,
    dest: config.paths.output.root,
    changed: { extension: '.json' },
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
    taskName: 'index.html',
    src: config.paths.index.src,
    dest: config.paths.output.root,
    rename: 'index.html',
    changed: { extension: '.html' },
    debug: config.debugOptions
} );

taskMaker.defineTask( 'htmlMinify', {
    taskName: 'htmlmin',
    src: config.paths.html,
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
    taskName: 'jsmin',
    src: config.paths.js.output,
    dest: config.paths.output.app,
    debug: config.debugOptions
} );


taskMaker.defineTask( 'tslint', {
    taskName: 'tslint-src',
    src: config.paths.ts.src,
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

taskMaker.defineTask( 'browserSync', {
    taskName: 'serve',
    browserSyncConfig: config.browserSyncConfig
} );

// no-op = empty function
gulp.task( 'noop', ( cb ) => {
    cb();
} );


gulp.task( 'ensures-develop', false, ( cb ) => {

    /**
     * Loga o erro encontrado.
     *
     * @param {String} err - o erro disparado
     *
     * @returns {void}
     */
        const onError = err => {
            gutil.log( gutil.colors.red( err ) );
        };

    /**
     * Dispara um erro se a branch atual não se chamar config.developBranch
     *
     * @param {String} branch - o nome da branch atual
     *
     * @returns {void}
     */
    const throwErrorIfNotInMaster = branch => {
        if ( branch.trim() !== config.developBranch ) {
            throw new Error( `Branch atual: "${branch.trim()}". Acão permtida somente na branch de desenvolvimento: "${config.developBranch}".` );
        }
        cb();
    };

    getCurrentBranchAsync().then( throwErrorIfNotInMaster )
                           .catch( onError );
} );

gulp.task( 'ensures-master', false, ( cb ) => {

    /**
     * Loga o erro encontrado.
     *
     * @param {String} err - o erro disparado
     *
     * @returns {void}
     */
    const onError = err => {
        gutil.log( gutil.colors.red( err ) );
    };

    /**
     * Dispara um erro se a branch atual não se chamar config.masterBranch
     *
     * @param {String} branch - o nome da branch atual
     *
     * @returns {void}
     */
    const throwErrorIfNotInMaster = branch => {
        if ( branch.trim() !== config.masterBranch ) {
            throw new Error( `Branch atual: "${branch.trim()}". Só é possível criar um release da branch "${config.masterBranch}".` );
        }
        cb();
    };

    getCurrentBranchAsync().then( throwErrorIfNotInMaster )
                           .catch( onError );
} );

gulp.task( 'ensures-release-branch', false, ( cb ) => {

    /**
     * Loga o erro encontrado.
     *
     * @param {String} err - o erro disparado
     *
     * @returns {void}
     */
    const onError = err => {
        gutil.log( gutil.colors.red( err ) );
    };

    /**
     * Dispara um erro se a branch atual não se chamar config.masterBranch
     *
     * @param {String} branch - o nome da branch atual
     *
     * @returns {void}
     */
    const throwErrorIfNotInReleaseBranch = branch => {
        if ( !branch.trim().startsWith( 'release-' ) ) {
            throw new Error( `Branch atual: "${branch.trim()}". Só é possível preparar um release estando numa release branch (release-*).` );
        }
        cb();
    };

    getCurrentBranchAsync().then( throwErrorIfNotInReleaseBranch )
                           .catch( onError );
} );

gulp.task( 'bump', false, ( cb ) => {
    runSequence( 'bump-npm', 'bump-cordova', cb );
} );

gulp.task( 'bump-cordova', false, ( cb ) => {
    const pkg = readJsonFile( config.paths.packageJson );

    gulp.src( config.paths.cordovaConfig )
        .pipe( cheerio( {
            parserOptions: {
                xmlMode: true
            },
            run: ( $ ) => {
                $( 'widget' ).attr( 'version', pkg.version );
            }
        } ) )
        .pipe( gulp.dest( './' ) )
        .on( 'end', cb );
} );

gulp.task( 'bump-npm', false, ( cb ) => {
    let bumpType = 'patch';

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
        .on( 'end', cb );
} );

gulp.task( 'commit', false, () => {
    const pkg = readJsonFile( config.paths.packageJson );
    const message = `feat(bump): Atualiza versão para ${pkg.version}`;

    return gulp.src( [ config.paths.packageJson, config.paths.cordovaConfig ] )
        .pipe( git.commit( message ) );
} );

gulp.task( 'tag', false, [ 'ensures-master' ], ( cb ) => {
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

gulp.task( 'push', false, [ 'ensures-master' ], ( cb ) => {
    git.push( 'origin', config.masterBranch, ( err ) => {
        if ( err ) {
            throw new Error( err );
        }
        cb();
    } );
} );

gulp.task( 'push-tags', false, [ 'ensures-master' ], ( cb ) => {
    git.push( 'origin', config.masterBranch, { args: '--tags' }, ( err ) => {
        if ( err ) {
            throw new Error( err );
        }
        cb();
    } );
} );

gulp.task( 'create-release-branch', false, [ 'ensures-develop', 'bump' ], ( cb ) => {
    const pkg = readJsonFile( config.paths.packageJson );
    const branchName = `release-v${pkg.version}`;

    git.checkout( branchName, { args: '-b' }, ( err ) => {
        if ( err ) {
            throw new Error( err );
        }
        runSequence( 'commit', cb );
    } );
} );


gulp.task( 'changelog', false, ( cb ) => {
    const pkg = readJsonFile( config.paths.packageJson );
    const options = argv;
    const version = options.version || pkg.version;
    const from = options.from || 'start';

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

gulp.task( 'github:authenticate', false, [ 'ensures-master' ], () => {
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

gulp.task( 'github:create-release', false, [ 'ensures-master', 'github:authenticate' ], () => {
    const pkg = readJsonFile( config.paths.packageJson );
    const v = `v${pkg.version}`;
    const isPrerelease = !!semver.parse( pkg.version ).prerelease.length;

    return gulp.src( config.paths.changelog )
               .pipe( tap( ( file ) => {
                   let releaseBody = file.contents.toString();
                   const release = {
                       'tag_name': v,
                       'name': v,
                       'target_commitish': config.masterBranch,
                       'body': releaseBody.slice( releaseBody.indexOf( '###' ) ),
                       'prerelease': isPrerelease
                   };
                   client.post( '/repos/prodest/es-na-palma-da-mao-mobile/releases', release, ( err, res, body ) => { // eslint-disable-line no-unused-vars
                       if ( err ) {
                           gutil.log( gutil.colors.red( `Error: ${err}` ) );
                       } else {
                           del( config.paths.changelog );
                       }
                   } );
               } ) );
} );

gulp.task( 'transpile-app-ts', function() {
    return gulp.src( config.paths.ts.app )
               .pipe( sourcemaps.init() )
               .pipe( typescript( tsProject ) )
               .pipe( sourcemaps.write() )
               .pipe( gulp.dest( config.paths.output.app ) );
} );

gulp.task( 'delay', false, ( cb ) => {
    setTimeout( cb, 3000 );
} );

gulp.task( 'create-release', 'Cria e publica uma nova release no Github e faz upload do changelog.', ( cb ) => {
    return runSequence( 'ensures-master', 'test', 'tag', 'push', 'push-tags', 'delay', 'changelog', 'github:create-release', cb );
} );

gulp.task( 'compile', 'Compila a aplicação e copia o resultado para a pasta de distribuição.', ( cb ) => {

    // Se flag argv.transpile seja informado, realiza o transpile do js e copia o resultado para
    // a pasta de onde a app será executada. Caso argv.transpile NÃO seja informado, copia o código
    // js como está a "transpilation" será delegada automaticamente para o systemJS, o que é bom
    // em tempo de desenvolvimento mas que aumenta significativamente número e o tamanho das
    // requisições.
    const transpile = argv.transpile || environment.isProduction();
    const jsmin = argv.jsmin || environment.isProduction();
    const htmlmin = argv.htmlmin || environment.isProduction();
    const bundle = argv.bundle || environment.isProduction();

	// tasks que transformam/copiam arquivos para a pasta de distribuição
    let compileTasks = [
        'eslint-src',
        'tslint-src',
        'css',
        'json',
        'assets',
        'system.yuml',
        'packageJson',
        'systemConfig',
        'index.html',
        transpile ? 'transpile-app-ts' : 'app-ts',
        transpile ? 'transpile-app-js' : 'app-js',
        htmlmin ? 'htmlmin' : 'html'
    ];

	// tasks executadas nos arquivos copiados na pasta de distribuição.
    if ( jsmin ) {
        compileTasks.push( [ 'jsmin' ] );
    }

    if ( bundle ) {
        compileTasks.push( 'bundle' );
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
    } else {
        gutil.log( gutil.colors.yellow( `Nenhuma task configurada para o ENV: ${environment.name}` ) );
    }
} );

gulp.task( 'default', 'Executa task \'run\'', [ 'run' ] );

gulp.task( 'analyze', 'Analiza o código', ( cb ) => {
    runSequence( 'eslint-src', 'tslint-src', 'transpile-app-ts', cb );
} );


////////////////////////////////////////////////////////////////////////////////////////////////////
// Android Specific tasks
gulp.task( 'build-android', () => {
    return gulp.src( 'dist' )
               .pipe( cordovaCreate() )
               //.pipe(plugin('org.apache.cordova.dialogs'))
               //.pipe(plugin('org.apache.cordova.camera'))
               .pipe( android() )
               .pipe( gulp.dest( 'apk' ) );
} );

gulp.task( 'build-android-release', () => {
    return gulp.src( 'dist' )
               .pipe( cordovaCreate() )
                //.pipe(plugin('org.apache.cordova.dialogs'))
                //.pipe(plugin('org.apache.cordova.camera'))
               .pipe( android( {
                   release: true,
                   storeFile: '../../espm.keystore',
                   keyAlias: 'espm'
               } ) )
              .pipe( gulp.dest( 'apk' ) );
} );


gulp.task( 'bundle', ( done ) => {
    const bundler = new Bundler( {
        baseUrl: 'www',
        source: 'www',
        dest: 'www/bundles',
        cssOptimize: true,
        systemJsConfig: 'www/system.config.js'
    } );

    bundler.bundle( {
        components: [
            'app',
            'home',
            'news/highlights',
            'shared',
            'shared/authentication',
            'shared/dialog',
            'shared/toast',
            'shared/loader',
            'layout/menu',
            'shared/routes'
        ],
        packages: [
            'ionic', // carrega angular e ui-router junto
            'angular-i18n/pt-br',   // on pt-br you can use your locale
            'angular-material',
            'ionic-native-transitions',
            'ngstorage',
            'angular-ui-router',
            'ui-router-extras',
            'oclazyload',
            'moment',
            'moment/locale/pt-br.js',
            'font-awesome',
            'css',
            'json',
            'text'
        ]
    }, 'main' )
    .then( () => bundler.bundleRemainingComponents() )
    .then( () => bundler.bundleRemainingPackages() )
    .then( () => bundler.saveConfig() )
    .then( () => done() )
    .catch( ( err ) => done( err ) );
} );



/**
 * Run test once and exit
 */
gulp.task( 'test', ( cb ) => {
    new karma.Server( {
        configFile: `${__dirname}/config/karma.conf.js`,
        singleRun: true
    }, cb ).start();
} );
