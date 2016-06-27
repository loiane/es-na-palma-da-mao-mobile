import gulpHelpers from '../gulp/helpers';
import _ from 'lodash';

let environment = gulpHelpers.environment();

let paths = {
    e2e: 'test-e2e/**/*.js',
    e2eOutput: 'test-e2e-compile/',
    packageJson: './package.json',
    changelog: './CHANGELOG.md',
    js: {
        all: [
            './**/*.js',
            '!./node_modules/**/*.js',
            '!./hooks/**/*.js',
            '!./plugins/**/*.js',
            '!./www/lib/**/*.js',
            '!./config/system.js',
            '!system.yuml.js'
        ],
        src: './src/**/*.js',
        app: 'src/app/**/*.js',
        output: 'www/app/**/*.js'
    },
    html: [
        'src/app/**/*.html', '!src/index.html'
    ],
    templates: [
        'src/app/**/*.tpl.html', '!src/index.html'
    ],
    css: [ 'src/app/**/*.css' ],
    assets: [
        './src/app/**/*.svg',
        './src/app/**/*.woff',
        './src/app/**/*.ttf',
        './src/app/**/*.png',
        './src/app/**/*.ico',
        './src/app/**/*.gif',
        './src/app/**/*.jpg',
        './src/app/**/*.eot'
    ],
    json: './src/app/**/*.json',
    index: {
        src: './src/index.html'
    },
    watch: './src/app/**/*',
    karmaConfig: `${__dirname}/karma.conf.js`,
    systemConfig: './config/system.config.js',
    systemYuml: './system.yuml.js',

    // output
    output: {
        root: 'www',
        lib: 'www/lib',
        app: 'www/app',
        html: [ 'www/app/**/*.html', 'www/*.html' ],
        temp: [ 'www/app', 'www/*.html', 'www/*.js' ]
    },
    gulp: [ './config/gulp.js', './gulpfile.babel.js', './gulp/tasks/*.js' ],
};

let config = {
    repository: 'https://github.com/prodest/es-na-palma-da-mao',
    environment: environment,
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
    browserSyncConfig: {
        port: environment.port(),
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
        files: [ 'src/app/**/*' ],
        server: {
            baseDir: 'www'
        },
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
    debugOptions: { active: false },
    masterBranch: 'master'
};

// sobrescreve configurações se estiver em produção
if ( environment.isProduction() ) {
    _.merge( config.browserSyncConfig, {
        codeSync: false,
        reloadOnRestart: false,
        port: environment.port()
    } );
}

export default config;
