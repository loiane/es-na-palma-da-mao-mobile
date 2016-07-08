import {IStateService} from 'angular-ui-router';
import {IWindowService} from 'angular';

class HomeController {

    /**
     * @constructor
     * @param {IStateService} $state
     * @param {IWindowService} $window
     * @param {Object} settings
     */
    constructor( private $state:IStateService,
                 private $window:IWindowService,
                 private settings ) {
    }

    /**
     *
     */
    login():void {
        this.$state.go( 'login' );
    }

    /**
     * Redireciona para 1ª tela do processo de criação de conta
     */
    createAccount():void {
        this.$window.open( 'https://acessocidadao.es.gov.br/Conta/VerificarCPF', '_system' );
    }

}

HomeController.$inject = [ '$state', '$window', 'settings' ];

export default HomeController;
