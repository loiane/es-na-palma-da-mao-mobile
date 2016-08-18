import { ITimeoutService } from 'angular';

export class PushService {

    public static $inject: string[] = [
        '$state',
        '$ionicHistory',
        '$ionicNativeTransitions',
        '$mdSidenav'
    ];

    constructor( private $state: angular.ui.IStateService,
                 private $ionicHistory: ionic.navigation.IonicHistoryService,
                 private $ionicNativeTransitions,
                 private $mdSidenav: angular.material.ISidenavService ) {
    }

    public notify( data: any ): void {
        // TODO: Save any data for later use
        this.navigateTo( data.appData.state );
    }

    /**
     *  Fecha a barra de navegação lateral
     *  It will use with event on-swipe-left="closeSideNav()" on-drag-left="closeSideNav()"
     *  When user swipe or drag md-sidenav to left side
     *
     *  @returns {void}
     */
    public closeSideNav(): void {
        this.$mdSidenav( 'left' ).close();
    }

    /**
     * Navega para o state especificado
     *
     * @param {string} stateName - o nome do state destino
     *
     * @returns {void}
     */
    public navigateTo( stateName: string ): void {
        this.closeSideNav();
        if ( this.$ionicHistory.currentStateName() !== stateName ) {

            this.$ionicHistory.nextViewOptions( {
                disableAnimate: true,
                disableBack: true,
                historyRoot: true
            });

            if ( this.$ionicNativeTransitions ) {
                this.$ionicNativeTransitions.stateGo( stateName );
            } else {
                this.$state.go( stateName );
            }
        }
    }
}
