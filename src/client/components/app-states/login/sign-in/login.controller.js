/** Login Controller */
class LoginController {

    /**
     * @constructor
     */
    constructor( $rootScope, $state, $localStorage, OAuth2, OAuthDigits, OAuthFacebook, OAuthGoogle, dialog, toast, appConfig, $window, $ionicHistory, $ionicLoading ) {
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
        this.$ionicLoading = $ionicLoading;

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

        this.$state.go( 'app.dashboard.newsHighlights' );
    }

    _getOAuth2AppConfig( obj ) {
        return this.$.extend( {}, this.appConfig, obj );
    }

    _signInSuccess() {
        this.user = {};
        this.goToDashboard();
    }

    _getDataIdentityServer( clientId, clientSecret, grantType, scope ) {
        let data = {
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: grantType,
            scope: scope
        };

        return data;
    }

    _getDataIdentityServerAcessoCidadao( options, username, password ) {
        let data = {};

        if ( username ) {
            data.username = username;
        }
        if ( password ) {
            data.password = password;
        }

        return angular.extend( {}, options, data );

    }

    _getDataIdentityServerSocialNetwork( options, provider, accesstoken ) {
        let data = {};

        if ( provider ) {
            data.provider = provider;
        }

        if ( accesstoken ) {
            data.accesstoken = accesstoken;
        }

        return angular.extend( {}, options, data );
    }

    _getDataIdentityServerPhone( options, provider, apiUrl, authHeader ) {
        let data = {};

        data.accesstoken = "token";

        if ( provider ) {
            data.provider = provider;
        }

        if ( apiUrl ) {
            data.apiUrl = apiUrl;
        }

        if ( authHeader ) {
            data.authHeader = authHeader;
        }

        return angular.extend( {}, options, data );
    }

    /**
     * Executa login na aplicação de acordo com as configurações do AppConfig, usuário e senha.
     */
    signIn() {
        let isData = this._getDataIdentityServer( this.appConfig.identityServer.clients.espm.id, this.appConfig.identityServer.clients.espm.secret, 'password', 'openid' );
        isData = this._getDataIdentityServerAcessoCidadao( isData, this.user.name, this.user.password );

        this.$ionicLoading.show();
        this.OAuth2.signIn( isData ).then( () => {
            this._signInSuccess();
        }, () => {
            //TODO: Tratar error
            this.toast.error( {
                title: 'Credênciais inválidas'
            } );
        } )
            .finally( () => {
                this.$ionicLoading.hide();
            } );
    }

    /**
     * https://github.com/jeduan/cordova-plugin-facebook4
     */
    facebookLogin() {

        this.OAuthFacebook.login( [ 'email', 'public_profile' ], ( responseFacebook ) => {
            //Com o token do facebook, busca o token do acesso cidadão
            let isData = this._getDataIdentityServer( this.appConfig.identityServer.clients.espmExternalLoginAndroid.id, this.appConfig.identityServer.clients.espmExternalLoginAndroid.secret, 'customloginexterno', 'openid' );
            isData = this._getDataIdentityServerSocialNetwork( isData, 'Facebook', responseFacebook.authResponse.accessToken );

            this.OAuth2.signIn( isData ).then( () => {
                this._signInSuccess();
            }, () => {
                //TODO: Tratar error
                this.toast.error( {
                    title: 'Erro no Acesso Cidadão'
                } );
            } )
                .finally( () => {
                    this.$ionicLoading.hide();
                } );
        }, () => {
            //TODO: Tratar error
            this.toast.error( {
                title: 'Falha no login'
            } );
        } );
    }

    googleLogin() {
        let options = {
            'scopes': 'profile email', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
            'webClientId': this.appConfig.googleWebClientId, // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
            'offline': true // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
        };

        this.$ionicLoading.show();
        this.OAuthGoogle.login( options, ( responseGoogle ) => {
            //Com o token do google, busca o token do acesso cidadão
            let isData = this._getDataIdentityServer( this.appConfig.identityServer.clients.espmExternalLoginAndroid.id, this.appConfig.identityServer.clients.espmExternalLoginAndroid.secret, 'customloginexterno', 'openid' );
            isData = this._getDataIdentityServerSocialNetwork( isData, 'Google', responseGoogle.oauthToken );

            this.OAuth2.signIn( isData ).then( () => {
                this._signInSuccess();
            }, () => {
                //TODO: Tratar error
                this.toast.error( {
                    title: 'Erro no Acesso Cidadão'
                } );
            } )
                .finally( () => {
                    this.$ionicLoading.hide();
                } );
        }, () => {
            //TODO: Tratar error
            this.toast.error( {
                title: 'Falha no login'
            } );
        } );
    }

    digitsLogin() {
        this.$ionicLoading.show();
        this.OAuthDigits.login( {}, ( responseDigits ) => {
            //Com o token do digits, busca o token do acesso cidadão
            let isData = this._getDataIdentityServer( this.appConfig.identityServer.clients.espmExternalLoginAndroid.id, this.appConfig.identityServer.clients.espmExternalLoginAndroid.secret, 'customloginexterno', 'openid' );
            isData = this._getDataIdentityServerPhone( isData, 'Celular', responseDigits[ 'X-Auth-Service-Provider' ], responseDigits[ 'X-Verify-Credentials-Authorization' ] );

            this.OAuth2.signIn( isData ).then( () => {
                this._signInSuccess();
            }, () => {
                //TODO: Tratar error
                this.toast.error( {
                    title: 'Erro no Acesso Cidadão'
                } );
            } )
                .finally( () => {
                    this.$ionicLoading.hide();
                } );
        }, () => {
            //TODO: Tratar error
            this.toast.error( {
                title: 'Falha no login'
            } );
        } );
    }

    openUrlForgotPassword() {
        this.$window.open( 'https://acessocidadao.es.gov.br/Conta/SolicitarReinicioSenha', '_system' );
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
    '$ionicLoading',
    LoginController
];
