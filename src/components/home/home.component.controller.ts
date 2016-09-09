import { IWindowService } from 'angular';

export class HomeController {

    public static $inject: string[] = [ '$state', '$window' ];

    /**
     * Creates an instance of HomeController.
     * 
     * @param {angular.ui.IStateService} $state
     * @param {IWindowService} $window
     * @param {ISettings} settings
     */
    constructor( private $state: angular.ui.IStateService,
                 private $window: IWindowService ) {
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

