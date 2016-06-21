
/** Login Controller */
class HomeController {

    /**
     * @constructor
     */
    constructor( $state, $window, appConfig ) {
        this.appConfig = appConfig;
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
        
        this.$window.open("https://acessocidadao.es.gov.br", "_system");

        //TODO: Criar funcionalidade de cadastro
        //this.$state.go( 'app.cpfVerificar' );
    }

}

export default [
    '$state',
    '$window',
    'appConfig',
    HomeController
];
