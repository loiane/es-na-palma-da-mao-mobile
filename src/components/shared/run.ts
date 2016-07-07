import moment from 'moment';
import 'moment/locale/pt-br';
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
function run( $rootScope, $window, $state, $ionicPlatform, $ionicHistory, $mdDialog, $mdBottomSheet, OAuth2, settings ) {

    // configura locale do moment
    moment.locale( settings.locale );

    /**
     * Preenche o $rootScope
     *
     * @returns {void}
     */
    function initialRootScope() {
        $rootScope.moment = moment;
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

    /**
     * TODO:
     */
    function isAuthenticated() {
        OAuth2.initialize( settings.identityServer.url );
        return OAuth2.fetchUserInfo();
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

        //Check if is authenticated and redirect correctly. After the verification hide the splashscreen on device
        isAuthenticated()
            .then( () => {
                if ( angular.isDefined( OAuth2.userInfo ) ) {
                    $state.go( 'app.dashboard.newsHighlights' );
                } else {
                    $state.go( 'home' );
                }
            }, () => {
                $state.go( 'home' );
            } )
            .finally( () => {
                if ( $window.navigator.splashscreen ) {
                    $window.navigator.splashscreen.hide();
                }
            } );

    } );
}

run.$inject = [
    '$rootScope',
    '$window',
    '$state',
    '$ionicPlatform',
    '$ionicHistory',
    '$mdDialog',
    '$mdBottomSheet',
    'OAuth2',
    'settings'
];

export default run;

