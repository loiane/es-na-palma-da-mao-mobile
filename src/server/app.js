/*eslint angular/log: 0*/
/* eslint-disable no-console */

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

console.log( 'node executando:' );
console.log( `  PORT=${port}` );
console.log( `  NODE_ENV=${environment}` );
console.log( `\n=========================== AMBIENTE:${environment.toUpperCase()}\n=========================== AMBIENTE:` );

app.use( express.static( 'www' ) );
app.use( '/!**!/!*', ( req, res ) => four0four.send404( req, res, null ) );    // Any invalid calls for templateUrls are under app/!* and should return 404*/

app.listen( port, () => {
    console.log( `Express server escutando na porta ${port}:` );
    console.log( `  env = ${app.get( 'env' )};\n  __dirname = ${__dirname};\n  process.cwd = ${process.cwd()};` );
} );

