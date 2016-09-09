import moment from 'moment';
import 'moment/locale/pt-br';
import { AuthenticationService } from './authentication/index';
import { HttpSnifferService, HttpErrorSnifferService } from './http/index';
import { IWindowService } from 'angular';
import { ISettings } from './settings/index';
import { CordovaPermissions } from './permissions/index';

/**
 * Executado quando aplicação inicia para configurar execução da app, como navegação, etc
 * 
 * @param {*} $rootScope
 * @param {IWindowService} $window
 * @param {angular.ui.IStateService} $state
 * @param {ionic.platform.IonicPlatformService} $ionicPlatform
 * @param {angular.material.IDialogService} $mdDialog
 * @param {any} $mdBottomSheet
 * @param {HttpSnifferService} httpSnifferService
 * @param {ISettings} settings
 */
function run( $rootScope: any,
    $window: IWindowService,
    $state: angular.ui.IStateService,
    $ionicPlatform: ionic.platform.IonicPlatformService,
    $mdDialog: angular.material.IDialogService,
    $mdBottomSheet,
    authenticationService: AuthenticationService,
    httpSnifferService: HttpSnifferService,
    httpErrorSnifferService: HttpErrorSnifferService,
    settings: ISettings,
    cordovaPermissions: CordovaPermissions ) {

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

        $rootScope.httpSnifferService = httpSnifferService;
        $rootScope.httpErrorSnifferService = httpErrorSnifferService;
        $rootScope.uiState = {
            loading: false,
            pendingRequests: 0,
            error: undefined
        };

        // We can now watch the trafficCop service to see when there are pending
        // HTTP requests that we're waiting for.
        $rootScope.$watch(() => {
            $rootScope.uiState.pendingRequests = httpSnifferService.pending.all;
            $rootScope.uiState.loading = $rootScope.uiState.pendingRequests > 0;
            $rootScope.uiState.error = httpErrorSnifferService.error;
        });
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


    $ionicPlatform.ready(() => {
        ionic.Platform.isFullScreen = true;

        if ( $window.cordova && $window.cordova.plugins.Keyboard ) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar( true );
            cordova.plugins.Keyboard.disableScroll( true );
        }

        initialRootScope();

        $rootScope.$on( '$ionicView.beforeEnter', () => {
            hideActionControl();
            httpErrorSnifferService.error = undefined; // limpa errors quando muda de tela
        });

        if ( $window.navigator.splashscreen ) {
            $window.navigator.splashscreen.hide();
        }

        // Check coarse location permissions
        cordovaPermissions.RequestCoarseLocationPermission();

        authenticationService.refreshTokenIfNeeded()
            .then(() => {
                $state.go( 'app.dashboard.newsHighlights' );
            })
            .catch(() => {
                authenticationService.signOut(() => $state.go( 'home' ) );
            });

        if ( $window.navigator.splashscreen ) {
            $window.navigator.splashscreen.hide();
        }
    });

    $ionicPlatform.on( 'resume', () => {
        if ( authenticationService.isAuthenticated ) {
            authenticationService.refreshTokenIfNeeded()
                .catch(() => authenticationService.signOut(() => $state.go( 'home' ) ) );
        }
    });
}

run.$inject = [
    '$rootScope',
    '$window',
    '$state',
    '$ionicPlatform',
    '$mdDialog',
    '$mdBottomSheet',
    'authenticationService',
    'httpSnifferService',
    'httpErrorSnifferService',
    'settings',
    'cordovaPermissions'
];

export default run;

