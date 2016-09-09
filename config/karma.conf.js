// Referências de configuração de karma + ES + code coverage:
// ref: https://github.com/gunnarlium/babel-jspm-karma-jasmine-istanbul

var browsers = [ 'PhantomJS' ]; // para builds locais
var coverage_reporters = [ { type: 'text' } ];
var reporters = [ 'mocha'/*, 'coverage'*/ ];

if ( process.env.TRAVIS ) {

    console.log( 'Executando no Travis: enviando coveralls' );

    coverage_reporters.push( {
        type: 'lcov',
        subdir: 'report-lcov'
    } );
    reporters.push( 'coveralls' );
} else {

    console.log( 'Executando localmente: não enviando coveralls' );

    coverage_reporters.push( {
        type: 'html',
        subdir: 'report-html'
    } );
}

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
                'src/components/**/!(about*).specs.ts'
            ],
            serveFiles: [
                'src/components/**/*.css',
                'src/components/**/*.html',
                'src/components/**/*.json',
                'src/components/**/*.png',
                'src/components/**/!(*specs).ts'
            ]
        },

        preprocessors: {
		// - Arquivos fontes para os quais queremos gerar coverage
		// - Não inclua arquivos de testes ou bibliotecas
		// - Esses arquivos serão instrumentados pelo Istanbul
            'src/components/**/!(*specs).ts': [ /*'coverage',*/ 'sourcemap' ]
        },

        coverageReporter: {
            dir: 'coverage/',
            reporters: coverage_reporters
        },

        proxies: {
            '/node_modules': '/base/node_modules',
            '/jspm_packages/': '/base/www/jspm_packages/',
            '/src/': '/base/src/'
        },

        reporters: reporters,
        browsers: browsers,
        singleRun: true
    } );
};
