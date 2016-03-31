// ES6 gulpfile
// ref: https://markgoodyear.com/2015/06/using-es6-with-gulp/
import innerGulp from 'gulp';
import gulpHelpers from './gulp/helpers';
import gulpHelp from 'gulp-help';

let gulp = gulpHelp( innerGulp ); // wrap in gulp help
let taskMaker = gulpHelpers.taskMaker( gulp );
let situation = gulpHelpers.situation();
let _ = gulpHelpers.framework( '_' );
let runSequence = gulpHelpers.framework( 'run-sequence' );
let port = process.env.PORT || '8001';

let path = {

    //tests
    e2e: 'test-e2e/**/*.js',
    e2eOutput: 'test-e2e-compile/',

    //src
    allJs: 'src/**/*.js',
    clientJs: 'src/client/**/*.js',
    html: [ 'src/client/**/*.html', '!src/client/components/app-core/index.tpl.html' ],
    templates: [ 'src/client/**/*.tpl.html', '!src/client/components/app-core/index.tpl.html' ],
    css: [ 'src/client/**/*.css' ],
    assets: [ './src/client/**/*.svg',
    './src/client/**/*.woff',
    './src/client/**/*.ttf',
    './src/client/**/*.png',
    './src/client/**/*.ico',
    './src/client/**/*.gif',
    './src/client/**/*.jpg',
    './src/client/**/*.eot'
    ],
    json: './src/client/**/*.json',
    index: './src/client/components/app-core/index.tpl.html',
    watch: './src/client/**',
    karmaConfig: `${__dirname}/karma.conf.js`,
    systemConfig: './system.config.js',

    // output
    output: '.dist/',
    minify: '.dist/**/*.js',

    //server
    server: 'src/server/',
    nodeServer: 'src/server/app.js'
};

//see: https://github.com/kangax/html-minifier#user-content-options-quick-reference
let htmlMinOptions = {
    collapseWhitespace: true,
    removeComments: false, // but preserve conditional comments to IE
    removeCDATASectionsFromCDATA: true, // remove comments from inlie js and css
    collapseInlineTagWhitespace: true,
    removeTagWhitespace: true,
    useShortDoctype: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    minifyJS: true,
    minifyCSS: true
};


let nodemonConfig = {
    script: path.nodeServer,
    delayTime: 1,
    ext: 'js html json',
    env: {
        'PORT': port,
        'NODE_ENV': 'dev'
    },
    watch: path.server
};

let browserSyncConfig = {
    proxy: `localhost:${port}`,
    port: '3000',
    ghostMode: { // these are the defaults t,f,t,t
        clicks: true,
        location: false,
        forms: true,
        scroll: true
    },
    injectChanges: true,
    logFileChanges: true,
    logLevel: 'info',
    logPrefix: 'Portal do Cidadão',
    notify: true,
    open: true
};

//
//
// {
//     open: false,
//     ui: false,
//     notify: true,
//     ghostMode: false,
//     port: process.env.PORT || 9000,
//     server: {
//         baseDir: [path.output],
//         routes: {
//             '/config/system.js': './config/system.js',
//             '/jspm_packages': './jspm_packages'
//         }
//     }
// };

if ( situation.isProduction() ) {
    browserSyncConfig = _.merge( browserSyncConfig, {
        codeSync: false,
        reloadOnRestart: false,
        server: {
            snippetOptions: {
                rule: {
                    match: /qqqqqqqqqqq/
                }
            }
        }
    } );

    nodemonConfig = _.merge( nodemonConfig, {
        'NODE_ENV': 'build'
    } );
}

let cacheBustConfig = {
    usePrefix: false,
    patterns: [
        {
            match: '<!-- PROD',
            replacement: ''
        }, {
            match: 'END -->',
            replacement: ''
        }, {
            match: '{{hash}}',
            replacement: Math.round( new Date() / 1000 )
        }
    ]
};

let babelOptions = {
    plugins: [ 'transform-es2015-modules-systemjs' ]
};

let debugOptions = { active: true };

/**
 * todo: yargs variables
 */
taskMaker.defineTask( 'clean', { taskName: 'clean', debug: debugOptions, taskDeps: [ 'clean-e2e' ], src: path.output } );
taskMaker.defineTask( 'clean', { taskName: 'clean-e2e', debug: debugOptions, src: path.e2eOutput } );
taskMaker.defineTask( 'css', { taskName: 'css', debug: debugOptions, src: path.css, dest: path.output } );
taskMaker.defineTask( 'babel', { taskName: 'babel', debug: debugOptions, src: path.clientJs, dest: path.output, ngAnnotate: true, compilerOptions: babelOptions } );
taskMaker.defineTask( 'babel', { taskName: 'babel-e2e', debug: debugOptions, src: path.e2e, dest: path.e2eOutput, compilerOptions: babelOptions, taskDeps: [ 'clean-e2e' ] } );
taskMaker.defineTask( 'copy', { taskName: 'html', debug: debugOptions, src: path.html, dest: path.output, compilerOptions: babelOptions } );
taskMaker.defineTask( 'copy', { taskName: 'systemConfig', debug: debugOptions, src: path.systemConfig, dest: path.output } );
taskMaker.defineTask( 'copy', { taskName: 'assets', debug: debugOptions, src: path.assets, dest: path.output } );
taskMaker.defineTask( 'copy', { taskName: 'json', debug: debugOptions, src: path.json, dest: path.output, changed: { extension: '.json' } } );
taskMaker.defineTask( 'copy', { taskName: 'index.html', src: path.index, dest: path.output, debug: debugOptions, rename: 'index.html' } );
taskMaker.defineTask( 'copy', { taskName: 'cache-bust-index.html', src: path.index, dest: path.output, debug: debugOptions, rename: 'index.html', replace: cacheBustConfig } );
taskMaker.defineTask( 'htmlMinify', { taskName: 'htmlMinify-index.html', taskDeps: [ 'cache-bust-index.html' ], src: path.output, dest: path.output, debug: debugOptions, minimize: htmlMinOptions } );
taskMaker.defineTask( 'htmlHint', { taskName: 'html-hint', debug: debugOptions, src: path.html } );
taskMaker.defineTask( 'minify', { taskName: 'minify', debug: debugOptions, src: path.minify, dest: path.output } );
taskMaker.defineTask( 'eslint', { taskName: 'eslint', debug: debugOptions, src: path.allJs, dest: 'src/', taskDeps: [ 'eslint-gulp', 'eslint-gulp-tasks' ] } );
taskMaker.defineTask( 'eslint', { taskName: 'eslint-gulp', debug: debugOptions, src: './gulpfile.babel.js', dest: './gulpfile.babel.js' } );
taskMaker.defineTask( 'eslint', { taskName: 'eslint-gulp-tasks', debug: debugOptions, src: './gulp/**/*.js', dest: './gulp/', watchTask: true } );
taskMaker.defineTask( 'watch', { taskName: 'watch', src: path.watch, tasks: [ 'compile', 'index.html', 'eslint' ] } );
taskMaker.defineTask( 'nodemon', { taskName: 'serve', browserSyncConfig: browserSyncConfig, nodemonConfig: nodemonConfig } );
// taskMaker.defineTask('karma', { taskName: 'karma', configFile: path.karmaConfig });
// //taskMaker.defineTask('routeBundler', {taskName: 'routeBundler', config: routeBundleConfig});
//

gulp.task( 'compile', 'Compila a aplicação executanto: [css, html, babel, json, assets] tasks paralelamente.', function( callback ) {
    return runSequence( [ 'css', 'html', 'babel', 'json', 'assets' ], callback );
} );

gulp.task( 'recompile', 'Limpa diretório destino e compila aplicação.', function( callback ) {
    return runSequence( 'clean', [ 'compile' ], callback );
} );
//
// gulp.task('test', function (callback) {
//     return runSequence('recompile', 'karma', callback);
// });
//


gulp.task( 'run', 'Executa a aplicação no ambiente configurado: dev, prod, etc.', function( callback ) {
    if ( situation.isProduction() ) {
        return runSequence( 'recompile', 'routeBundler', 'cache-bust-index.html', 'htmlMinify-index.html', 'minify', 'serve', callback );
    } else if ( situation.isDevelopment() ) {
        return runSequence( 'recompile', 'eslint', 'index.html', 'serve', 'watch', callback );
    }
} );

// executa a tarefa default
gulp.task( 'default', 'Executa task \'run\'', [ 'run' ] );
