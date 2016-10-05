import moment from 'moment';
import 'moment/locale/pt-br';
import { Keyboard } from 'ionic-native';
import { AuthenticationService } from './authentication/index';
import { HttpSnifferService, HttpErrorSnifferService } from './http/index';
import { NetworkService } from './network/index';
import { IWindowService } from 'angular';
import { ISettings } from './settings/index';
import { CordovaPermissions } from './permissions/index';
import { Route, statesJson } from './routes/index';

/**
 * Executado quando aplicação inicia para configurar execução da app, como navegação, etc
 * 
 * @param {*} $rootScope
 * @param {IWindowService} $window
 * @param {angular.ui.IStateService} $state
 * @param {ionic.platform.IonicPlatformService} $ionicPlatform
 * @param {ionic.navigation.IonicHistoryService} $ionicHistory
 * @param {angular.material.IDialogService} $mdDialog
 * @param {any} $mdBottomSheet
 * @param {HttpSnifferService} httpSnifferService
 * @param {ISettings} settings
 */
function run( $rootScope: any,
    $window: IWindowService,
    $state: angular.ui.IStateService,
    $ionicPlatform: ionic.platform.IonicPlatformService,
    $ionicHistory: ionic.navigation.IonicHistoryService,
    $ionicNativeTransitions: any,
    $mdDialog: angular.material.IDialogService,
    $mdBottomSheet,
    networkService: NetworkService,
    authenticationService: AuthenticationService,
    httpSnifferService: HttpSnifferService,
    httpErrorSnifferService: HttpErrorSnifferService,
    settings: ISettings,
    cordovaPermissions: CordovaPermissions ) {

    // configura locale do moment
    moment.locale( settings.locale );

    /**
     * 
     */
    function buildMenuFromRoutes() {
        const menu: { items: Route[], groups: any } = {
            items: statesJson.filter(( s: Route ) => s.menu ),
            groups: {}
        };
        menu.items.forEach( item => {
            let groupName = item.group || 'Principal';
            menu.groups[ groupName ] = menu.groups[ groupName ] || [];
            menu.groups[ groupName ].push( item );
        });

        return menu;
    }

    function navigateToTab( stateName: string, direction: string ): void {
        if ( $ionicHistory.currentStateName() !== stateName ) {
            if ( $ionicNativeTransitions ) {
                let options: any = { type: 'slide', direction: direction };

                if ( $rootScope.isAndroid ) {
                    options.fixedPixelsTop = 93;
                } else if ( $rootScope.isIOS ) {
                    options.fixedPixelsBottom = 48;
                }

                $ionicNativeTransitions.stateGo( stateName, {}, {}, options );
            } else {
                $state.go( stateName );
            }
        }
    }

    /**
     * Preenche o $rootScope
     *
     * @returns {void}
     */
    function initialRootScope() {
        $rootScope.menu = buildMenuFromRoutes();
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

        $rootScope.navigateToTab = navigateToTab;

        // We can now watch the trafficCop service to see when there are pending
        // HTTP requests that we're waiting for.
        $rootScope.$watch(() => {
            $rootScope.uiState.pendingRequests = httpSnifferService.pending.all;
            $rootScope.uiState.loading = $rootScope.uiState.pendingRequests > 0;
            $rootScope.uiState.error = httpErrorSnifferService.error;
        });

        $rootScope.$on( 'noConnection', () => {
            networkService.showNetworkAlert();
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

        Keyboard.hideKeyboardAccessoryBar( true );
        Keyboard.disableScroll( true );

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
        if (authenticationService.hasToken) {
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
    '$ionicHistory',
    '$ionicNativeTransitions',
    '$mdDialog',
    '$mdBottomSheet',
    'networkService',
    'authenticationService',
    'httpSnifferService',
    'httpErrorSnifferService',
    'settings',
    'cordovaPermissions'
];

export default run;

