import { IStateService } from 'angular-ui-router';

export class DashBoardController {

    public static $inject: string[] = [ '$state' ];

    /**
     * Creates an instance of DashBoardController.
     * 
     * @param {IStateService} $state
     */
    constructor( private $state: IStateService ) {
        this.activate();
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




