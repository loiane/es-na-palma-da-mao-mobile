import gulpHelpers from '../gulp/helpers';
import _ from 'lodash';

let environment = gulpHelpers.environment();

let paths = {
	e2e: 'test-e2e/**/*.js',
	e2eOutput: 'test-e2e-compile/',
	packageJson: './package.json',
	changelog: './CHANGELOG.md',
	ts: {
		src: './src/**/*.ts',
		app: './src/components/**/*.ts'
	},
	js: {
		all: [
			'./**/*.js',
			'!./node_modules/**/*.js',
			'!./hooks/**/*.js',
			'!./plugins/**/*.js',
			'!./www/jspm_packages/**/*.js',
			'!./config/system.js',
			'!system.yuml.js'
		],
		src: './src/**/*.js',
		app: './src/components/**/*.js',
		output: 'www/components/**/*.js'
	},
	html: [
		'src/components/**/*.html', '!src/index.html'
	],
	templates: [
		'src/components/**/*.tpl.html', '!src/index.html'
	],
	css: [ 'src/components/**/*.css' ],
	scss: [ 'src/components/**/*.scss' ],
	assets: [
		'./src/components/**/*.svg',
		'./src/components/**/*.woff',
		'./src/components/**/*.ttf',
		'./src/components/**/*.png',
		'./src/components/**/*.ico',
		'./src/components/**/*.gif',
		'./src/components/**/*.jpg',
		'./src/components/**/*.eot'
	],
	json: './src/components/**/*.json',
	index: {
		src: './src/index.html'
	},
	watch: './src/components/**/*',
	karmaConfig: `${__dirname}/karma.conf.js`,
	systemConfig: './config/system.config.js',
	systemYuml: './system.yuml.js',

	// output
	output: {
		root: 'www',
		jspm_packages: 'www/jspm_packages',
		app: 'www/components',
		ionfonts: 'www/components/fonts',
		html: [ 'www/components/**/*.html', 'www/*.html' ],
		temp: [ 'www/components', 'www/bundles', 'www/*.*', 'coverage' ]
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
		files: [ 'src/components/**/*' ],
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
	autoPrefixerConfig: {
		browsers: [
			'last 2 versions',
			'iOS >= 7',
			'Android >= 4',
			'Explorer >= 10',
			'ExplorerMobile >= 11'
		],
		cascade: false
	},
	sassConfig: {
		includePaths: [
			'www/jspm_packages/npm/ionic-angular@2.0.0-beta.10',
			'www/jspm_packages/npm/ionicons@3.0.0/dist/scss'
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
	});
}

export default config;
