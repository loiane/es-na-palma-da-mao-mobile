/**
 *
 * @param $rootScope
 * @param $state
 * @param $ionicPlatform
 * @param $ionicHistory
 * @param $mdDialog
 * @param $mdBottomSheet
 */
function appRun( $rootScope, $state, $ionicPlatform, $ionicHistory, $mdDialog, $mdBottomSheet ) {

    /**
     * Fills the $rootScope
     * @returns {void}
     */
    function initialRootScope() {
        //$rootScope.appPrimaryColor = appPrimaryColor;       // Add value of appPrimaryColor to rootScope for use it to base color.
        $rootScope.$state = $state;
        $rootScope.isAndroid = ionic.Platform.isAndroid();  // Check platform of running device is android or not.
        $rootScope.isIOS = ionic.Platform.isIOS();          // Check platform of running device is ios or not.
    }

    /**
     * For android if user tap hardware back button, Action and Dialog should be hide.
     * @returns {void}
     */
    function hideActionControl() {
        $mdBottomSheet.cancel();
        $mdDialog.cancel();
    }

    $ionicPlatform.ready( function() {
        ionic.Platform.isFullScreen = true;

        if ( window.cordova && window.cordova.plugins.Keyboard ) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar( true );
            cordova.plugins.Keyboard.disableScroll( true );
        }

        initialRootScope();

        //Checking if view is changing it will go to this function.
        $rootScope.$on( '$ionicView.beforeEnter', function() {
            hideActionControl();  //hide Action Control for android back button.
        } );
    } );
}

export default[
    '$rootScope', '$state', '$ionicPlatform', '$ionicHistory', '$mdDialog', '$mdBottomSheet', appRun
];

