
System.import( 'mobile-detect' ).then( function( MobileDetect ) {
    var PLUGIN_NAME = '!platform';
    var WEB_FOLDER = '/web';
    var MOBILE_FOLDER = '/mobile';

    var md = new MobileDetect( window.navigator.userAgent );
    var systemNormalize = System.normalize;

    System.normalize = function( name, parentName, parentAddress ) {

        if ( name.indexOf( PLUGIN_NAME ) !== -1 ) {
            name = name.replace( PLUGIN_NAME, '' );

            if ( md.mobile() ) {
                name = name.replace( WEB_FOLDER, MOBILE_FOLDER );
            }

            else if ( !md.mobile() ) {
                name = name.replace( MOBILE_FOLDER, WEB_FOLDER );
            }
        }
        return systemNormalize.call( this, name, parentName, parentAddress );
    }
} );

