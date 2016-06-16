
/** Login Controller */
class HomeController {

    /**
     * @constructor
     */
    constructor( $state, appConfig ) {
        this.appConfig = appConfig;
        this.$state = $state;

    }

    login() {
        this.$state.go( 'login' );
    }

    /**
     * Redireciona para 1ª tela do processo de criação de conta
     */
    createAccount() {
        //TODO: Redirecionar pra web
        //this.$state.go( 'app.cpf-check' );

        //TODO: Criar funcionalidade de cadastro
        //this.$state.go( 'app.cpfVerificar' );
    }

}

export default [
    '$state',
    'appConfig',
    HomeController
];
