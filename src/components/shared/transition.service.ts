import { ITimeoutService, IScope } from 'angular';

export class TransitionService {

    public static $inject: string[] = [
        '$rootScope',
        '$state',
        '$timeout',
        '$ionicHistory',
        '$ionicNativeTransitions',
        '$mdSidenav'
    ];

    constructor( private $rootScope: IScope,
        private $state: angular.ui.IStateService,
        private $timeout: ITimeoutService,
        private $ionicHistory: ionic.navigation.IonicHistoryService,
        private $ionicNativeTransitions,
        private $mdSidenav: angular.material.ISidenavService ) {
    }

    /**
       *  Fecha a barra de navegação lateral
       *  It will use with event on-swipe-left="closeSideNav()" on-drag-left="closeSideNav()"
       *  When user swipe or drag md-sidenav to left side
       *
       *  @returns {void}
       */
    private closeSideNav(): void {
        this.$mdSidenav( 'left' ).close();
    }


    /**
     * 
     * 
     * @param {string} stateName
     * 
     * @memberOf TransitionService
     */
    public changeRootState( stateName: string ): void {
        this.changeState( stateName, {}, {}, true );
    }


    /**
     * 
     * 
     * @param {string} stateName
     * @param {string} direction
     * 
     * @memberOf TransitionService
     */
    public changeTab( stateName: string, direction: string ): void {
        let options = { type: 'slide', direction: direction };
        this.changeState( stateName, {}, options, false, true );
    }

    /**
     * 
     * 
     * @param {string} stateName
     * @param {*} [routeParameters={}]
     * @param {*} [options={}]
     * @param {boolean} [isRoot=false]
     * @param {boolean} [isTabs=false]
     * @param {boolean} [reload=false]
     * 
     * @memberOf TransitionService
     */
    public changeState( stateName: string, routeParameters: any = {}, options: any = {}, isRoot: boolean = false, isTabs: boolean = false, reload: boolean = false ): void {
        // this.$timeout(() => {
        this.closeSideNav();

        let defaultOptions: any = { type: 'fade' };
        angular.extend( defaultOptions, options );

        if ( isRoot ) {
            this.$ionicHistory.nextViewOptions( {
                disableBack: true,
                historyRoot: true
            });
        }

        if ( isTabs ) {
            if ( this.$rootScope.isAndroid ) {
                defaultOptions.fixedPixelsTop = 93;
            } else if ( this.$rootScope.isIOS ) {
                defaultOptions.fixedPixelsBottom = 48;
            }
        }

        if ( this.$ionicNativeTransitions ) {
            this.$ionicNativeTransitions.stateGo( stateName, routeParameters, { reload: reload }, defaultOptions );
        } else {
            if ( this.$ionicHistory.currentStateName() !== stateName ) {
                this.$state.go( stateName, routeParameters );
            }
        }

        // }, ( this.$rootScope.isAndroid === false ? 300 : 0 ) );
    }

    /**
     * 
     * 
     * 
     * @memberOf TransitionService
     */
    public clearCache(): Promise<void> {
        // limpa view caches do ionic
        // ref: http://stackoverflow.com/questions/29593018/ionic-there-is-a-way-to-delete-the-cache-in-controller-method
        return new Promise(( resolve ) => {
            this.$timeout(() => {
                this.$ionicHistory.clearCache();
                this.$ionicHistory.clearHistory();
                resolve();
            }, 100 );
        });
    }
}