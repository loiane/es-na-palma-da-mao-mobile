#!/usr/bin/env node

// each object in the array consists of a key which refers to the source and
// the value which is the destination.
var filestocopy = [ {
    "resources/android/images/extintor.png":
    "platforms/android/res/drawable/extintor.png"
}, {
    "resources/android/images/notification.png":
    "platforms/android/res/drawable/notification.png"
}]; /*, {
    "resources/android/sounds/ring.mp3":
    "platforms/android/res/raw/ring.mp3"
}, {
    "resources/ios/sounds/ring.caf":
    "platforms/ios/YourAppName/ring.caf"
}, ];*/

var fs = require( 'fs' );
var path = require( 'path' );

// no need to configure below
var rootdir = path.resolve(__dirname ,'../../'); // process.argv[ 2 ];

console.log( 'argvv', process.argv );
console.log('__dirname', __dirname)
console.log('rootdir', rootdir)


filestocopy.forEach( function ( obj ) {
    Object.keys( obj ).forEach( function ( key ) {
        var val = obj[ key ];
        var srcfile = path.join( rootdir, key );
        var destfile = path.join( rootdir, val );
        //console.log("copying "+srcfile+" to "+destfile);
        var destdir = path.dirname( destfile );
        if (!fs.existsSync( destdir )){
            fs.mkdirSync( destdir );
        }

        if ( fs.existsSync( srcfile ) && fs.existsSync( destdir ) ) {
            fs.createReadStream( srcfile )
              .pipe( fs.createWriteStream( destfile ) );
        }
    });
});
