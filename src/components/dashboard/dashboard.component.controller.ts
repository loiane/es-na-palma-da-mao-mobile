import ToastService from '../shared/toast/toast.service';

class DashBoardController {

    /**
     * @constructor
     *
     * @param toast
     * @param $state
     */
    constructor( private toast:ToastService, private $state ) {
        this.activate();
    }

    /**
     * Navega para o state especificado
     *
     * @param {string} stateName - o nome do state destino
     *
     * @returns {void}
     */
    navigateTo( stateName:string ) {
        this.$state.go( stateName );
    }

    /**
     * Ativa o component
     *
     * @returns {void}
     */
    activate() {
    }
}

DashBoardController.$inject = ['toast', '$state'];

export default  DashBoardController;



