// ES6 gulpfile
// ref: https://markgoodyear.com/2015/06/using-es6-with-gulp/
import innerGulp    from 'gulp';
import gulpHelpers  from './gulp/helpers';
import gulpHelp     from 'gulp-help';

let gulp        = gulpHelp(innerGulp); // wrap in gulp help
let taskMaker   = gulpHelpers.taskMaker(gulp);
let situation   = gulpHelpers.situation();
let _           = gulpHelpers.framework('_');
let runSequence = gulpHelpers.framework('run-sequence');
let port        = process.env.PORT || '8001';

let path = {
    
    //tests
    e2e: 'test-e2e/**/*.js',
    e2eOutput: 'test-e2e-compile/',
    
    //src
    allJs:'src/**/*.js',
    clientJs: 'src/client/**/*.js',
    html: ['src/client/**/*.html','!src/client/index.tpl.html'],
    templates: ['src/client/**/*.tpl.html', '!src/client/index.tpl.html'],
    css: ['src/client/**/*.css'],
    assets: ['./src/client/**/*.svg', 
    './src/client/**/*.woff', 
    './src/client/**/*.ttf', 
    './src/client/**/*.png', 
    './src/client/**/*.ico', 
    './src/client/**/*.gif', 
    './src/client/**/*.jpg', 
    './src/client/**/*.eot'
    ],
    json: './src/client/**/*.json',
    index: './src/client/index.tpl.html',
    
    // html que não será compilado em templateCache pois será u
    // startupHtml: [
    //      'src/client/**/layout/**/*.tpl.html',
    //      'src/client/sections/dashboard/dashboard.tpl.html'
    // ],
    watch: './src/client/**',
    karmaConfig: `${__dirname}/karma.conf.js`,
    systemConfig: './system.config.js',
    //routes: './src/app/routes.json',
    
    // output
    output: 'dist/',
    minify: 'dist/**/*.js',
    
    //server
    server: 'src/server/',
    nodeServer:  'src/server/app.js'
};
// 
// let routes = require(path.routes);
// let routesSrc = routes.map(function(r) { return r.src; });

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
        'NODE_ENV':'dev'
    },
    watch: path.server
};

let browserSyncConfig = {
    proxy: `localhost:${port}`,
    port:'3000',
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

if (situation.isProduction()) {
    browserSyncConfig = _.merge(browserSyncConfig, {
        codeSync: false,
        reloadOnRestart: false,
        server: {
            snippetOptions: {
                rule: {
                    match: /qqqqqqqqqqq/
                }
            }
        }
    });
    
    nodemonConfig = _.merge(nodemonConfig,{
        'NODE_ENV':'build'
    });
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
            replacement: Math.round(new Date() / 1000)
        }
    ]
};

// let routeBundleConfig = {
// 	baseURL: path.output,
// 	main: 'app/app',
// 	routes: routesSrc,
// 	bundleThreshold: 0.6,
// 	config: path.systemConfig,
// 	sourceMaps: true,
// 	minify: false,
// 	dest: 'dist/app',
// 	destJs: 'dist/app/app.js'
// };

let babelOptions = {
    plugins: ['transform-es2015-modules-systemjs']
};

let debugOptions = { active:false };

/**
 * yargs variables can be passed in to alter the behavior, when present.
 * Example: gulp serve-dev
 *
 * --verbose  : Various tasks will produce more output to the console.
 * --nosync   : Don't launch the browser with browser-sync when serving code.
 * --debug    : Launch debugger with node-inspector.
 * --debug-brk: Launch debugger and break on 1st line with node-inspector.
 * --startServers: Will start servers for midway tests on the test task.
 */
taskMaker.defineTask('clean', { taskName: 'clean', debug: debugOptions, taskDeps: ['clean-e2e'], src: path.output });
taskMaker.defineTask('clean', { taskName: 'clean-e2e', debug: debugOptions, src: path.e2eOutput });
taskMaker.defineTask('css', { taskName: 'css', debug:debugOptions, src: path.css, dest: path.output });
taskMaker.defineTask('babel', { taskName: 'babel', debug: debugOptions, src: path.clientJs, dest: path.output, ngAnnotate: true, compilerOptions: babelOptions });
taskMaker.defineTask('babel', { taskName: 'babel-e2e', debug: debugOptions, src: path.e2e, dest: path.e2eOutput, compilerOptions: babelOptions, taskDeps: ['clean-e2e'] });
taskMaker.defineTask('copy', { taskName: 'html', debug: debugOptions, src: path.html, dest: path.output, compilerOptions: babelOptions });
taskMaker.defineTask('copy', { taskName: 'systemConfig', debug: debugOptions, src: path.systemConfig, dest: path.output });
taskMaker.defineTask('copy', { taskName: 'assets', debug: debugOptions, src: path.assets, dest: path.output });
taskMaker.defineTask('copy', { taskName: 'json', debug: debugOptions, src: path.json, dest: path.output, changed: { extension: '.json' } });
taskMaker.defineTask('copy', { taskName: 'index.html', src: path.index, dest: path.output, debug: debugOptions, rename: 'index.html' });
taskMaker.defineTask('copy', {taskName: 'cache-bust-index.html', src: path.index, dest: path.output,debug: debugOptions, rename: 'index.html', replace: cacheBustConfig });
taskMaker.defineTask('htmlMinify', {taskName: 'htmlMinify-index.html', taskDeps: ['cache-bust-index.html'], src: path.output, dest: path.output, debug: debugOptions, minimize: htmlMinOptions});   
taskMaker.defineTask('minify', { taskName: 'minify', debug: debugOptions, src: path.minify, dest: path.output });
taskMaker.defineTask('jshint', { taskName: 'lint', debug: debugOptions, src: path.allJs });
taskMaker.defineTask('jshint', { taskName: 'jshint-gulp', debug: debugOptions, src: ['./gulpfile.babel.js','./gulp/**/*.js'] });
taskMaker.defineTask('watch', { taskName: 'watch', src: path.watch, tasks: ['compile', 'index.html', 'lint'] });
taskMaker.defineTask('nodemon', { taskName: 'serve', browserSyncConfig: browserSyncConfig, nodemonConfig: nodemonConfig});
// taskMaker.defineTask('karma', { taskName: 'karma', configFile: path.karmaConfig });
// //taskMaker.defineTask('routeBundler', {taskName: 'routeBundler', config: routeBundleConfig});
// 
 
gulp.task('compile', 'Compila a aplicação executanto: [css, html, babel, json, assets] tasks paralelamente.', function (callback) {
    return runSequence(['css', 'html', 'babel', 'json', 'assets'], callback);
});

gulp.task('recompile', 'Limpa diretório destino e compila aplicação.', function (callback) {
    return runSequence('clean', ['compile'], callback);
});
// 
// gulp.task('test', function (callback) {
//     return runSequence('recompile', 'karma', callback);
// });
//  


gulp.task('run', 'Executa a aplicação no ambiente configurado: dev, prod, etc.', function (callback) {
    if (situation.isProduction()) {
        return runSequence('recompile', 'routeBundler', 'cache-bust-index.html', 'htmlMinify-index.html', 'minify', 'serve', callback);
    } else if (situation.isDevelopment()) {
            return runSequence('recompile', 'lint', 'index.html', 'serve', 'watch', callback);
        }
});

// executa a tarefa default
gulp.task('default', 'Executa task \'run\'', ['run']);
