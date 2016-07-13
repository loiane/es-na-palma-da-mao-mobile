import {IStateService} from 'angular-ui-router';
import {IWindowService} from 'angular';

class HomeController {

    public static $inject: string[] = [ '$state', '$window', 'settings' ];

    /**
     * @constructor
     * @param {IStateService} $state
     * @param {IWindowService} $window
     * @param {Object} settings
     */
    constructor( private $state: IStateService,
                 private $window: IWindowService,
                 private settings ) {
    }

    /**
     *
     */
    public navigateToLogin(): void {
        this.$state.go( 'login' );
    }

    /**
     * Redireciona para 1ª tela do processo de criação de conta
     */
    public createAccount(): void {
        this.$window.open( 'https://acessocidadao.es.gov.br/Conta/VerificarCPF', '_system' );
    }

}

export default HomeController;
