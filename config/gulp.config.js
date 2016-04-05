import gulpHelpers from '../gulp/helpers';
let situation = gulpHelpers.situation();
let port = process.env.PORT || '8001';

let path = {
    //tests
    e2e: 'test-e2e/**/*.js',
    e2eOutput: 'test-e2e-compile/',

    //src
    srcJs: './src/**/*.js',
    allJs: [
        './**/*.js',
        '!./node_modules/**/*.js',
        '!./jspm_packages/**/*.js',
        '!./gulp-tasks/**/*.js',  // todo: temporário - remover
        '!./config/system.js',
        '!system.yuml.js'
    ],
    clientJs: 'src/client/**/*.js',
    serverJs: 'src/server/**/*.js',
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
    systemConfig: './config/system.config.js',

    // output
    output: '.dist/',
    minify: '.dist/**/*.js',
    gulp: [ './config/gulp.js', './gulpfile.babel.js', './gulp/tasks/*.js' ],

    //server
    server: 'src/server/',
    nodeServer: 'src/server/app.js'
};

let config = {
    situation: situation,
    path: path,
    //see: https://github.com/kangax/html-minifier#user-content-options-quick-reference
    htmlMinOptions: {
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
    },
    nodemonConfig: {
        script: path.nodeServer,
        delayTime: 1,
        ext: 'js html json',
        env: {
            'PORT': port,
            'NODE_ENV': 'dev'
        },
        watch: path.server
    },
    browserSyncConfig: {
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
        logPrefix: 'ES na palma da mão',
        notify: true,
        open: true
    },
    cacheBustConfig: {
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
    },
    babelOptions: {
        plugins: [ 'transform-es2015-modules-systemjs' ]
    },
    debugOptions: { active: false }
};

// sobrescreve conigura��es se estiver em produ��o
if ( config.situation.isProduction() ) {
    _.merge( config.browserSyncConfig, {
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

    _.merge( config.nodemonConfig, {
        'NODE_ENV': 'build'
    } );
}

module.exports = config;

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




//paths: {
//    build: {
//        output: 'build'
//    },
//    sources: ['src/**/*.js'],
//    configs: ['config/**/!(system).js', 'gulp-tasks/**/*.js', 'gulpfile.js'],
//    stylesheets: ['src/**/*.scss', 'src/**/*.css'],
//    scripts: [
//        'src/**/*.js',
//        'gulpfile.js'
//    ],
//    html: [
//        'src/**/*.html',
//        'index.html'
//    ],
//    static: [
//        './src/**/*.json',
//        './src/**/*.svg',
//        './src/**/*.woff',
//        './src/**/*.woff2',
//        './src/**/*.ttf',
//        './src/**/*.png',
//        './src/**/*.gif',
//        './src/**/*.ico',
//        './src/**/*.jpg',
//        './src/**/*.eot'
//    ]
//},
//serverPort: 8088,
//serverPortTest: 8089,
//livereload: true,
//notifications: true
