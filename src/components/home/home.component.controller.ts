/** Home Controller */
class HomeController {

    /**
     * @constructor
     */
    constructor( private $state, private $window, private settings ) {

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

HomeController.$inject = ['$state', '$window', 'settings'];

export default HomeController;
