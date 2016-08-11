import { IStateService } from 'angular-ui-router';
import { IWindowService } from 'angular';
import { ISettings } from '../shared/settings/index';

export class HomeController {

    public static $inject: string[] = [ '$state', '$window', 'settings' ];

    /**
     * Creates an instance of HomeController.
     * 
     * @param {IStateService} $state
     * @param {IWindowService} $window
     * @param {ISettings} settings
     */
    constructor( private $state: IStateService,
                 private $window: IWindowService,
                 private settings: ISettings ) {
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

