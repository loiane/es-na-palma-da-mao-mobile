
/** Login Controller */
class LoginController {

    /**
     * @constructor
     */
    constructor( $rootScope, $state, $localStorage, OAuth2, dialog, toast, appConfig ) {

        this.OAuth2 = OAuth2;
        this.appConfig = appConfig;

        this.toast = toast;
        this.dialog = dialog;
        this.$state = $state;
        this.$rootScope = $rootScope;
        this.$localStorage = $localStorage;

        this.activate();


    }

    activate() {
        this.usuario = {};
        this.apiResponse = '';
        this.token = this.$localStorage.token;
        this.tokenClaims = this.OAuth2.getTokenClaims();
    }

    /**
     * Redireciona para 1ª tela do processo de criação de conta
     */
    criarConta() {
        this.$state.go( 'app.cpfVerificar' );
    }

    /**
     * Busca um token de acesso
     */
    getToken() {
        var formData = {
            client_id: 'espm-mobile',
            client_secret: 'secret',
            grant_type: 'password',
            username: 'vizeke@gmail.com',
            password: 'password',
            scope: 'openid'
        };

        this.OAuth2.getToken( formData, ( response ) => {
            this.token = response;
        }, ( error ) => {
            console.log( error );
        } );
    }

    _getOAuth2AppConfig( obj ) {
        return this.$.extend( {}, this.appConfig, obj );
    }

    /**
     * Executa login na aplicação de acordo com as configurações do AppConfig, usuário e senha.
     */
    signin() {
        var formData = _getOAuth2AppConfig( {
            email: this.email,
            password: this.password
        } );

        this.OAuth2.signin( formData,
            () => {},
            () => { this.$rootScope.error = 'Invalid credentials.'; } );
    }

    facebookLogin( $event ) {
        console.log( 'facebookLogin' );

        this.dialog.alert( {
            targetEvent: $event,
            title: 'Logando com o Facebook',
            content: 'Efetuar login'
        } );

        //TODO:
    }

    googleLogin( $event ) {
        console.log( 'googleLogin' );

        this.dialog.alert( {
            targetEvent: $event,
            title: 'Logando com o Google',
            content: 'Efetuar login'
        } );

        //TODO:
    }

    /**
     * Executa logout da aplicação
     */
    logout() {
        this.OAuth2.logout( () => {
            this.$state.go( 'app' );
        } );
    }

}

export default [ '$rootScope',
                 '$state',
                 '$localStorage',
                 'OAuth2',
                 'dialog',
                 'toast',
                 'appConfig', LoginController ];
