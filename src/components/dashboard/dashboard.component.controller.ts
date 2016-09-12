import { IScope } from 'angular';

export class DashBoardController {

    public static $inject: string[] = [ '$scope', '$state' ];

    /**
     * Creates an instance of DashBoardController.
     * 
     * @param {angular.ui.IStateService} $state
     */
    constructor( private $scope: IScope, private $state: angular.ui.IStateService ) {
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }

    /**
     * Navega para o state especificado
     *
     * @param {string} stateName - o nome do state destino
     *
     * @returns {void}
     */
    public navigateTo( stateName: string ): void {
        this.$state.go( stateName );
    }

    /**
     * Ativa o component
     *
     * @returns {void}
     */
    public activate(): void {
        angular.element( document.querySelectorAll( 'ion-header-bar' ) ).addClass( 'espm-header-tabs' );
    }
}




