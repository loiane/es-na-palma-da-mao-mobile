/**
 * Executado quando aplicação inicia para configurar execução da app, como navegação, etc
 *
 * @param {Object} $rootScope - xxx service.
 * @param {Object} $window - xxx service.
 * @param {Object} $state - xxx service.
 * @param {Object} $ionicPlatform - xxx service.
 * @param {Object} $ionicHistory - xxx service.
 * @param {Object} $mdDialog - xxx service.
 * @param {Object} $mdBottomSheet - xxx service.
 *
 * @returns {void}
 */
function appRun( $rootScope, $window, $state, $ionicPlatform, $ionicHistory, $mdDialog, $mdBottomSheet ) {

    /**
     * Preenche o $rootScope
     *
     * @returns {void}
     */
    function initialRootScope() {
        $rootScope.$state = $state;
        $rootScope.isAndroid = ionic.Platform.isAndroid();  // Check platform of running device is android or not.
        $rootScope.isIOS = ionic.Platform.isIOS();          // Check platform of running device is ios or not.
    }

    /**
     * Para android: esconde controles Action e Dialog se o usuário clica no botão voltar do
     * dispositivo.
     *
     * @returns {void}
     */
    function hideActionControl() {
        $mdBottomSheet.cancel();
        $mdDialog.cancel();
    }

    $ionicPlatform.ready( () => {
        ionic.Platform.isFullScreen = true;

        if ( $window.cordova && $window.cordova.plugins.Keyboard ) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar( true );
            cordova.plugins.Keyboard.disableScroll( true );
        }

        initialRootScope();

        $rootScope.$on( '$ionicView.beforeEnter', () => {
            hideActionControl();
        } );
    } );
}

export default[
    '$rootScope',
    '$state',
    '$window',
    '$ionicPlatform',
    '$ionicHistory',
    '$mdDialog',
    '$mdBottomSheet',
    appRun
];

