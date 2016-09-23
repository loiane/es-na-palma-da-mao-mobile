import { IScope } from 'angular';

export class DashBoardController {

    public static $inject: string[] = [ '$scope', '$state', '$ionicNativeTransitions', '$ionicHistory' ];

    /**
     * Creates an instance of DashBoardController.
     * 
     * @param {angular.ui.IStateService} $state
     */
    constructor( private $scope: IScope) {
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
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




