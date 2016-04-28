import gulpHelpers from '../gulp/helpers';
let situation = gulpHelpers.situation();
let port = process.env.PORT || '8001';

let paths = {
    //tests
    e2e: 'test-e2e/**/*.js',
    e2eOutput: 'test-e2e-compile/',
    js: {
        all: [
            './**/*.js',
            '!./node_modules/**/*.js',
            '!./hooks/**/*.js',
            '!./plugins/**/*.js',
            '!./jspm_packages/**/*.js',
            '!./gulp-tasks/**/*.js',  // todo: temporário - remover
            '!./config/system.js',
            '!system.yuml.js'
        ],
        src: './src/**/*.js',
        client: 'src/client/**/*.js',
        server: 'src/server/**/*.js'
    },
    html: [
        'src/client/**/*.html',
        '!src/client/components/app-core/index.tpl.html',
        '!src/client/components/app-core/index.tpl.mobile.html'
    ],
    templates: [
        'src/client/**/*.tpl.html', '!src/client/components/app-core/index.tpl.html'
    ],
    css: [ 'src/client/**/*.css' ],
    assets: [
        './src/client/**/*.svg',
        './src/client/**/*.woff',
        './src/client/**/*.ttf',
        './src/client/**/*.png',
        './src/client/**/*.ico',
        './src/client/**/*.gif',
        './src/client/**/*.jpg',
        './src/client/**/*.eot'
    ],
    json: './src/client/**/*.json',
    index: {
        web: './src/client/components/app-core/index.tpl.html',
        mobile: './src/client/components/app-core/index.tpl.mobile.html'
    },
    watch: './src/client/**',
    karmaConfig: `${__dirname}/karma.conf.js`,
    systemConfig: './config/system.config.js',

    // output
    output: {
        root: 'www/app/',
        client: 'www/app/client',
        server: 'www/app/server',
    },
    minify: 'www/app/client/**/*.js',
    gulp: [ './config/gulp.js', './gulpfile.babel.js', './gulp/tasks/*.js' ],

    //server
    server: 'src/server/',
    nodeServer: 'www/app/server/app.js'
};

let config = {
    situation: situation,
    paths: paths, //see: https://github.com/kangax/html-minifier#user-content-options-quick-reference
    htmlMinOptions: {
        collapseWhitespace: true,
        removeComments: false, // but preserve conditional comments to IE
        removeCDATASectionsFromCDATA: true, // remove comments from inline js and css
        collapseInlineTagWhitespace: true,
        removeTagWhitespace: true,
        useShortDoctype: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,
        minifyCSS: true
    },
    nodemonConfig: {
        script: paths.nodeServer,
        delayTime: 1,
        ext: 'js html json',
        env: {
            'PORT': port,
            'NODE_ENV': 'dev'
        },
        watch: paths.server
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

// sobrescreve conigurações se estiver em produção
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

export default config;

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
