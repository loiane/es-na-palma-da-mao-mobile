import _ from "underscore";

/** Login Controller */
class LoginController {

    /**
     * @constructor
     */
    constructor( $rootScope, $state, $localStorage, OAuth2, OAuthDigits, OAuthFacebook, OAuthGoogle, dialog, toast, appConfig, $window, $ionicHistory, _ ) {
        this.appConfig = appConfig;
        this.OAuth2 = OAuth2;
        this.OAuth2.initialize( appConfig.identityServer.url );

        this.OAuthDigits = OAuthDigits;
        this.OAuthFacebook = OAuthFacebook;
        this.OAuthGoogle = OAuthGoogle;

        this.toast = toast;
        this.dialog = dialog;
        this.$state = $state;
        this.$rootScope = $rootScope;
        this.$localStorage = $localStorage;
        this.$window = $window;
        this.$ionicHistory = $ionicHistory;

        this._ = _;

        this.activate();
    }

    activate() {
        this.user = {};
        this.apiResponse = '';
        this.tokenClaims = this.OAuth2.tokenClaims;
    }

    goToDashboard() {
        this.$ionicHistory.nextViewOptions( {
            disableAnimate: true,
            historyRoot: true
        } );

        this.$state.go( 'app.storage' );
    }

    /**
     * Redireciona para 1ª tela do processo de criação de conta
     */
    criarConta() {
        this.$state.go( 'app.cpfVerificar' );
    }

    /*    getUserInfo() {
     this.OAuth2.getUserInfo( ( response ) => {
     console.log( response );
     }, ( error ) => {
     console.log( error );
     } );
     }*/

    _getOAuth2AppConfig( obj ) {
        return this.$.extend( {}, this.appConfig, obj );
    }

    _signInSuccess() {
        this.user = {};
        this.goToDashboard();
    }

    _getDataIdentityServer( clientId, clientSecret, grantType, scope ) {
        var data = {
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: grantType,
            scope: scope
        };

        return data;
    }

    _getDataIdentityServerAcessoCidadao(options, userame, password){
        let data = {};

        if ( username ) {
            data.username = username;
        }
        if ( password ) {
            data.password = password;
        }

        _.extend( options, data );
        return options;

    }

    _getDataIdentityServerSocialNetwork(options, provider, accesstoken) {
        let data = {};

        if ( provider ) {
            data.provider = provider;
        }

        if ( accesstoken ) {
            data.accesstoken = accesstoken;
        }

        _.extend( options, data );
        return options;
    }

    _getDataIdentityServerPhone(options, apiUrl, authHeader) {
        let data = {};

        if (apiUrl) {
            data.apiUrl = apiUrl;
        }

        if ( authHeader ) {
            data.authHeader = authHeader;
        }

        _.extend( options, data );
        return options;
    }

    /**
     * Executa login na aplicação de acordo com as configurações do AppConfig, usuário e senha.
     */
    signIn() {
        let isData = this._getDataIdentityServer( this.appConfig.identityServer.clients.espm.id, this.appConfig.identityServer.clients.espm.secret, 'password', 'openid' );
        isData = _getDataIdentityServerAcessoCidadao( isData, this.user.name, this.user.password);

        this.OAuth2.signIn( isData, ( response ) => {
            this._signInSuccess();
        }, ( error ) => {
            //TODO: Tratar error
            console.log( error );
            this.toast.error( {
                title: 'Credênciais inválidas'
            } );
        } );
    }

    /**
     * https://github.com/jeduan/cordova-plugin-facebook4
     */
    facebookLogin() {

        this.OAuthFacebook.login( [ 'email', 'public_profile' ], ( responseFacebook ) => {
            //Com o token do facebook, busca o token do acesso cidadão
            let isData = this._getDataIdentityServer(this.appConfig.identityServer.clients.espmFacebookLoginAndroid.id, this.appConfig.identityServer.clients.espmFacebookLoginAndroid.secret, 'customloginexterno', 'openid');
            isData = this._getDataIdentityServerSocialNetwork( isData, 'Facebook', responseFacebook.authResponse.accessToken );

            this.OAuth2.signIn( isData, ( response ) => {
                this._signInSuccess();
            }, ( error ) => {
                //TODO: Tratar error
                console.log( error );

                this.toast.error( {
                    title: 'Erro no Acesso Cidadão'
                } );
            } );
        }, ( error ) => {
            //TODO: Tratar error
            console.log( error );

            this.toast.error( {
                title: 'Falha no login'
            } );
        } );
    }

    googleLogin() {
        const options = {
            //'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
            'webClientId': this.appConfig.googleWebClientId, // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
            'offline': true // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
        };

        this.OAuthGoogle.login( options, ( responseGoogle ) => {
            //Com o token do google, busca o token do acesso cidadão
            let isData = this._getDataIdentityServer(this.appConfig.identityServer.clients.espmGoogleLoginAndroid.id, this.appConfig.identityServer.clients.espmGoogleLoginAndroid.secret, 'customloginexterno', 'openid');
            isData = this._getDataIdentityServerSocialNetwork( isData, 'Google', responseGoogle.oauthToken );

            this.OAuth2.signIn( isData, ( response ) => {
                this._signInSuccess();
            }, ( error ) => {
                //TODO: Tratar error
                console.log( error );

                this.toast.error( {
                    title: 'Erro no Acesso Cidadão'
                } );
            } );

            this._signInSuccess();
        }, ( error ) => {
            //TODO: Tratar error
            console.log( error );

            this.toast.error( {
                title: 'Falha no login'
            } );
        } );
    }

    digitsLogin() {
        this.OAuthDigits.login( {}, ( responseDigits ) => {
            //Com o token do digits, busca o token do acesso cidadão
            let isData = this._getDataIdentityServer(this.appConfig.identityServer.clients.espm.id, this.appConfig.identityServer.clients.espm.secret, 'customloginexterno', 'openid');
            isData = this._getDataIdentityServerPhone( isData, 'Celular', responseDigits.X-Auth-Service-Provider, responseDigits.X-Verify-Credentials-Authorization );

            this.OAuth2.signIn( isData, ( response ) => {
                this._signInSuccess();
            }, ( error ) => {
                //TODO: Tratar error
                console.log( error );
                this.toast.error( {
                    title: 'Erro no Acesso Cidadão'
                } );
            } );

            this._signInSuccess();
        }, ( error ) => {
            //TODO: Tratar error
            console.log( error );

            this.toast.error( {
                title: 'Falha no login'
            } );
        } );
    }

    _buildDigitsObject( data ) {
        var obj = {};
        data[ 'X-Verify-Credentials-Authorization' ].split( ',' ).forEach( ( item ) => {
            var aux = item.split( '=' );
            obj[ aux[ 0 ] ] = aux[ 1 ].substring( 1, aux[ 1 ].length - 1 );
        } );
        return obj;
    }

    /**
     * Executa logout da aplicação
     */
    logout() {
        this.OAuth2.logout( () => {
            this.$state.go( 'app.login' );
        } );
    }

}

export default [
    '$rootScope',
    '$state',
    '$localStorage',
    'OAuth2',
    'OAuthDigits',
    'OAuthFacebook',
    'OAuthGoogle',
    'dialog',
    'toast',
    'appConfig',
    '$window',
    '$ionicHistory',
    LoginController
];
