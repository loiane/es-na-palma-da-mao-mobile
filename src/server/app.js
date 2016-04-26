/*eslint angular/log: 0*/
'use strict';

let express = require( 'express' );
let app = express();
let bodyParser = require( 'body-parser' );
let logger = require( 'morgan' );
let port = process.env.PORT || 8001;
let four0four = require( './utils/404' )(); // eslint-disable-line no-unused-vars
let environment = process.env.NODE_ENV;

app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );
app.use( logger( 'dev' ) );

//app.use('/api', require('./routes'));

console.log( 'node running:' );
console.log( `  PORT=${port}` );
console.log( `  NODE_ENV=${environment}` );

switch ( environment ) {
case 'build':
    //console.log('\n================== ENV:BUILD ==================');
    //app.use(express.static('./dist/'));
    //app.use('/app/*', (req, res, next) => four0four.send404(req, res));    // Any invalid
    // calls for templateUrls are under app/* and should return 404 app.use('/*',
    // express.static('./build/index.html'));                   // Any deep link calls should
    // return index.html

    break;

default:
    console.log( '\n================== ENV:DEV ==================' );
    app.use( '/lib', express.static( './www/lib' ) );
    app.use( express.static( './www/app/client' ) );
    app.use( '/**/*', ( req, res, next ) => four0four.send404( req, res ) );    // Any invalid calls for templateUrls are under app/* and should return 404

    break;
}

app.listen( port, () => {
    console.log( `Express server listening on port ${port}:` );
    console.log( `  env = ${app.get( 'env' )};\n  __dirname = ${__dirname};\n  process.cwd = ${process.cwd()};` );
} );
