import moment from 'moment';
import 'moment/locale/pt-br';
import { AcessoCidadaoService } from './authentication/index';
import { HttpSnifferService } from './http/http-sniffer.service';
import { IWindowService, IRootScopeService } from 'angular';
import Settings from './settings';


/**
 * Executado quando aplicação inicia para configurar execução da app, como navegação, etc
 * 
 * @param {*} $rootScope
 * @param {IWindowService} $window
 * @param {ng.ui.IStateService} $state
 * @param {ionic.platform.IonicPlatformService} $ionicPlatform
 * @param {ionic.navigation.IonicHistoryService} $ionicHistory
 * @param {angular.material.IDialogService} $mdDialog
 * @param {any} $mdBottomSheet
 * @param {acessoCidadaoService} AcessoCidadaoService
 * @param {*} settings
 */
function run( $rootScope: any,
              $window: IWindowService,
              $state: ng.ui.IStateService,
              $ionicPlatform: ionic.platform.IonicPlatformService,
              $ionicHistory: ionic.navigation.IonicHistoryService,
              $mdDialog: angular.material.IDialogService,
              $mdBottomSheet,
              acessoCidadaoService: AcessoCidadaoService,
              httpSnifferService: HttpSnifferService,
              settings: any ) {

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
         $rootScope.uiState = {
             loading: false,
             pendingRequests: 0
         };
         // We can now watch the trafficCop service to see when there are pending
         // HTTP requests that we're waiting for.
         $rootScope.$watch( () => {
             $rootScope.uiState.pendingRequests = httpSnifferService.pending.all;
             $rootScope.uiState.loading = httpSnifferService.pending.all > 0;
         });
    }

    /**
     * 
     */
    function initAuthentication() {
         acessoCidadaoService.initialize( settings.identityServer.url );
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

    // /**
    //  * TODO:
    //  */
    // function isAuthenticated() {
    //     acessoCidadaoService.initialize( settings.identityServer.url );
    //     return acessoCidadaoService.getAcessoCidadaoUserClaims();
    // }

    $ionicPlatform.ready( () => {
        ionic.Platform.isFullScreen = true;

        if ( $window.cordova && $window.cordova.plugins.Keyboard ) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar( true );
            cordova.plugins.Keyboard.disableScroll( true );
        }

        initialRootScope();
        initAuthentication();

        $rootScope.$on( '$ionicView.beforeEnter', () => {
            hideActionControl();
        } );

        if ( acessoCidadaoService.authenticated ) {
            $state.go( 'app.dashboard.newsHighlights' );
        } else {
            $state.go( 'home' );
        }

        if ( $window.navigator.splashscreen ) {
            $window.navigator.splashscreen.hide();
        }

        // Check if is authenticated and redirect correctly. After the verification hide the splashscreen on device
        // isAuthenticated()
        //     .then( () => {
        //         if ( acessoCidadaoService.authenticated ) {
        //             $state.go( 'app.dashboard.newsHighlights' );
        //         } else {
        //             $state.go( 'home' );
        //         }
        //     }, () => {
        //         $state.go( 'home' );
        //     } )
        //     .finally( () => {
        //         if ( $window.navigator.splashscreen ) {
        //             $window.navigator.splashscreen.hide();
        //         }
        //     } );

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
    'acessoCidadaoService',
    'httpSnifferService',
    'settings'
];

export default run;

