import { IWindowService } from 'angular';
import { TransitionService } from '../shared/index';

export class HomeController {

    public static $inject: string[] = [ '$window', 'transitionService' ];

    /**
     * Creates an instance of HomeController.
     * 
     * @param {IWindowService} $window
     * @param {ISettings} settings
     */
    constructor( private $window: IWindowService,
        private transitionService: TransitionService, ) {
    }

    /**
     *
     */
    public navigateToLogin(): void {
        this.transitionService.changeState( 'login' );
    }

    /**
     * Redireciona para 1ª tela do processo de criação de conta
     */
    public createAccount(): void {
        this.$window.open( 'https://acessocidadao.es.gov.br/Conta/VerificarCPF', '_system' );
    }

}

