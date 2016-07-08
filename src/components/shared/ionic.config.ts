/**
 * Configura aspectos da app como: temas, etc
 *
 * @param {Object} $ionicConfigProvider - service
 *
 * @returns {void}
 */
function ionicConfig( $ionicConfigProvider, $ionicNativeTransitionsProvider ) {

    // Use for change ionic spinner to android pattern.
    $ionicConfigProvider.spinner.icon( 'android' );
    $ionicConfigProvider.views.swipeBackEnabled( false );

    //console.log( 'disable ionic transitions' );
    $ionicConfigProvider.views.transition( 'none' );

    $ionicConfigProvider.scrolling.jsScrolling( false );

    $ionicNativeTransitionsProvider.setDefaultOptions( {
        duration: 300, // in milliseconds (ms), default 400,
        slowdownfactor: 4, // overlap views (higher number is more) or no overlap (1), default 4
        iosdelay: -1, // ms to wait for the iOS webview to update before animation kicks in, default -1
        androiddelay: -1, // same as above but for Android, default -1
        winphonedelay: -1, // same as above but for Windows Phone, default -1,
        fixedPixelsTop: 0, // the number of pixels of your fixed header, default 0 (iOS and Android)
        fixedPixelsBottom: 0, // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
        triggerTransitionEvent: '$ionicView.afterEnter', // internal ionic-native-transitions option
        backInOppositeDirection: false // Takes over default back transition and state back transition to use the opposite direction transition to go back
    } );
}

ionicConfig.$inject = [ '$ionicConfigProvider', '$ionicNativeTransitionsProvider' ];

export default  ionicConfig;
