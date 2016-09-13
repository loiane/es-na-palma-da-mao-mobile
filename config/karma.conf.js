var browsers = [ 'PhantomJS' ]; // para builds locais
var reporters = [ 'mocha'];

module.exports = function( config ) {
    config.set( {
        basePath: '../',
        frameworks: [
            'jspm', 'mocha', 'chai', 'sinon-stub-promise', 'sinon'
        ],

        jspm: {
            config: 'config/system.config.js',
            packages: 'www/jspm_packages',
            loadFiles: [
                'src/components/**/*.specs.ts'
            ],
            serveFiles: [
                'src/components/**/*.css',
                'src/components/**/*.html',
                'src/components/**/*.json',
                'src/components/**/*.png',
                'src/components/**/!(*specs).ts',
                'package.json'
            ]
        },

        proxies: {
            '/node_modules': '/base/node_modules',
            '/jspm_packages/': '/base/www/jspm_packages/',
            '/src/': '/base/src/',
            '/src/package.json': '/base/package.json'
        },

        reporters: reporters,
        browsers: browsers,
        singleRun: true,
        browserNoActivityTimeout: 60000
    } );
};
