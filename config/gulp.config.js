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
            '!./jspm_packages/**/*.js',
            '!./config/system.js',
            '!system.yuml.js'
        ],
        src: './src/**/*.js',
        client: 'src/client/**/*.js',
        server: 'src/server/**/*.js',
        output: 'www/components/**/*.js'
    },
    html: [
        'src/client/**/*.html',
        '!src/client/components/app-core/index.tpl.html'
    ],
    templates: [
        'src/client/**/*.tpl.html',
        '!src/client/components/app-core/index.tpl.html'
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
        src: './src/client/components/app-core/index.tpl.html'
    },
    watch: './src/client/**/*',
    karmaConfig: `${__dirname}/karma.conf.js`,
    systemConfig: './config/system.config.js',
    systemYuml: './system.yuml.js',

    // output
    output: {
        root: 'www',
        lib: 'www/lib',
        app: 'www/components',
        html: [ 'www/components/**/*.html', 'www/*.html' ],
        server: 'www/web-server',
        temp: [ 'www/components', 'www/web-server', 'www/*.html', 'www/*.js' ]
    },
    gulp: [ './config/gulp.js', './gulpfile.babel.js', './gulp/tasks/*.js' ],

    //server
    server: 'src/server/',
    nodeServer: 'www/web-server/app.js'
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
    nodemonConfig: {
        script: paths.nodeServer,
        delayTime: 1,
        ext: 'js html json',
        env: {
            'PORT': environment.port(),
            'NODE_ENV': environment.name()
        },
        watch: paths.server
    },
    browserSyncConfig: {
        proxy: `localhost:${environment.port()}`,
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
        open: false
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
