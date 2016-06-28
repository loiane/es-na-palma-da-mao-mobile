/** Home Controller */
class HomeController {

    /**
     * @constructor
     */
    constructor( $state, $window, settings ) {
        this.settings = settings;
        this.$state = $state;
        this.$window = $window;

    }

    login() {
        this.$state.go( 'login' );
    }

    /**
     * Redireciona para 1ª tela do processo de criação de conta
     */
    createAccount() {
        this.$window.open( 'https://acessocidadao.es.gov.br/Conta/VerificarCPF', '_system' );
    }

}

export default [
    '$state', '$window', 'settings', HomeController
];
