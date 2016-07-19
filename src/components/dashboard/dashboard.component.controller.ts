import ToastService from '../shared/toast/toast.service';
import {IStateService} from 'angular-ui-router';

class DashBoardController {

    public static $inject: string[] = [ 'toast', '$state' ];

    /**
     * @constructor
     *
     * @param {ToastService} toast
     * @param {IStateService} $state
     */
    constructor( private toast: ToastService,
                 private $state: IStateService ) {
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
    }
}

export default DashBoardController;



