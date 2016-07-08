import ToastService from '../shared/toast/toast.service';
import {IStateService} from 'angular-ui-router';

class DashBoardController {

    /**
     * @constructor
     *
     * @param {ToastService} toast
     * @param {IStateService} $state
     */
    constructor( private toast:ToastService,
                 private $state:IStateService ) {
        this.activate();
    }

    /**
     * Navega para o state especificado
     *
     * @param {string} stateName - o nome do state destino
     *
     * @returns {void}
     */
    navigateTo( stateName:string ):void {
        this.$state.go( stateName );
    }

    /**
     * Ativa o component
     *
     * @returns {void}
     */
    activate():void {
    }
}

DashBoardController.$inject = [ 'toast', '$state' ];

export default DashBoardController;



