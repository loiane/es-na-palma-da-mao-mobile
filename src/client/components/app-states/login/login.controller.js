import 'jquery';

import '../../providers/oAuth2Factory.js';
import appConfig from '../../app-core-shared/app.config.js';

/** Login Controller */
class LoginController {

    /**
     * @constructor
     */
    constructor( $http, $rootScope, $state, $stateParams, $localStorage, OAuth2, dialog, appConfig, $ionicHistory ) {
        this.usuario = {};

        this.OAuth2 = OAuth2;
        this.appConfig = appConfig;
        this.$ionicHistory = $ionicHistory;

        this.dialog = dialog;
        this.$state = $state;
        this.$http = $http;
        this.$rootScope = $rootScope;
        this.$localStorage = $localStorage;

        this.activate();

        if ( $stateParams.cpf ) {
            this.usuario.cpf = $stateParams.cpf;
        }
    }

    activate() {
        this.apiResponse = '';
        this.token = this.$localStorage.token;
        this.tokenClaims = this.OAuth2.getTokenClaims();
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

    /**
     * Redireciona para 1ª tela do processo de criação de conta
     */
    criarConta() {
        this.$state.go( 'app.cpfVerificar' );
    }

    telaInicial() {
        this.$ionicHistory.goBack( -2 );
    }

    testOpenApi() {
        this.$http.get( 'http://localhost:46978/api/Deck' )
            .then( ( response ) => {
                this.apiResponse = response;
            } );
    }

    testOAuthApi() {
        this.$http.get( 'http://localhost:46978/api/Deck/1' )
            .then( ( response ) => {
                this.apiResponse = response;
            } );
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
     * TODO: Verifica se o CPF ja está cadastrado no Acesso ES
     * @returns $http promisse
     */
    cpfCadastrado( cpf ) {
       /* return $http.get( '', {
            params: {
                cpf: cpf
            }
        } );*/

        return true;
    }

    proximo() {
        switch ( this.$state.current.name ) {
        case 'app.cpfVerificar':
            this.$state.go( 'app.novoCadastro', { cpf: this.usuario.cpf } );

            /*this.cpfCadastrado( this.cpf )
                    .then( () => { this.$state.go( 'app.cpfCadastrado' ); },
                        () => { this.$state.go( 'app.novoCadastro' ); } );*/
            break;
        default:
            break;
        }
    }

    voltar() {
        this.$ionicHistory.goBack();
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

export default [ '$http', '$rootScope', '$state', '$stateParams', '$localStorage', 'OAuth2', 'dialog', 'appConfig', '$ionicHistory', LoginController ];
