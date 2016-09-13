// Referências de configuração de karma + ES + code coverage:
// ref: https://github.com/gunnarlium/babel-jspm-karma-jasmine-istanbul

var browsers = [ 'PhantomJS' ]; // para builds locais
var coverage_reporters = [

    // will generate html report
    { type: 'html', subdir: 'report-html' },

    // will generate json report file and this report is loaded to
    // make sure failed coverage cause gulp to exit non-zero
    { type: 'json', file: 'coverage-final.json' },

    // will generate Icov report file and this report is published to coveralls
    { type: 'lcov', subdir: 'report-lcov' },

    // it does not generate any file but it will print coverage to console
    // a summary of the coverage
    // {type: 'text-summary'},

    // it does not generate any file but it will print coverage to console
    // a detail report of every file
    { type: 'text' }
];
var reporters = [ 'mocha', 'jspm'/*, 'coverage', 'coveralls'*/ ];

if ( process.env.TRAVIS ) {
    console.log( 'Executando no Travis: enviando coveralls' );
    reporters.push( 'coverage' );
    reporters.push( 'coveralls' );
} else {
    console.log( 'Executando localmente: não enviando coveralls' );
}

module.exports = function( config ) {
    config.set( {
        basePath: '../',
        frameworks: [
            'jspm', 'mocha', 'chai', 'sinon-stub-promise', 'sinon'
        ],

        plugins: [
            require( '@uiuxengineering/karma-jspm' ),
            'karma-chai',
            'karma-coverage',
            'karma-coveralls',
            'karma-mocha',
            'karma-mocha-reporter',
            'karma-phantomjs-launcher',
            'karma-sinon',
            'karma-sinon-stub-promise'
        ],

        jspm: {
            stripExtension: false,
            dev: null,
            node: null,
            browser: null,
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

        preprocessors: {
		// - Arquivos fontes para os quais queremos gerar coverage
		// - Não inclua arquivos de testes ou bibliotecas
		// - Esses arquivos serão instrumentados pelo Istanbul
            'src/components/**/!(*specs).ts': [ 'jspm' ]
        },

        coverageReporter: {
            remap: true,
            dir: 'coverage/',
            reporters: coverage_reporters
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
        browserNoActivityTimeout: 600000
    } );
};
