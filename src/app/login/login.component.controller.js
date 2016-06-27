/** Login Controller */
class LoginController {

    /**
     * @constructor
     */
    constructor( $state, OAuth2, OAuthDigits, OAuthFacebook, OAuthGoogle, dialog, toast, settings, $window, $ionicHistory, $ionicLoading ) {
        this.settings = settings;
        this.OAuth2 = OAuth2;
        this.OAuth2.initialize( settings.identityServer.url );

        this.OAuthDigits = OAuthDigits;
        this.OAuthFacebook = OAuthFacebook;
        this.OAuthGoogle = OAuthGoogle;

        this.toast = toast;
        this.dialog = dialog;
        this.$state = $state;
        this.$window = $window;
        this.$ionicHistory = $ionicHistory;
        this.$ionicLoading = $ionicLoading;

        this.errorMsgs = {
            accountNotLinked: 'Usuário não encontrado.'
        };

        this.activate();
    }

    activate() {
        this.user = {};
        this.tokenClaims = this.OAuth2.tokenClaims;
    }

    goToDashboard() {
        this.$ionicHistory.nextViewOptions( {
            disableAnimate: true,
            historyRoot: true
        } );

        this.$state.go( 'app.dashboard.newsHighlights' );
    }

    isAccountNotLinked( data ) {
        return data.error == this.errorMsgs.accountNotLinked;
    }

    showDialogAccountNotLinked() {
        this.dialog.confirm( {
            title: 'Conta não vinculada',
            content: 'Acesse utilizando o usuário e senha ou clique para criar uma nova conta',
            ok: 'Criar conta'
        } ).then( () => {
            this.$window.open( 'https://acessocidadao.es.gov.br/Conta/VerificarCPF', '_system' );
        } );
    }

    signInSuccess() {
        this.user = {};
        this.goToDashboard();
    }

    getDataIdentityServer( clientId, clientSecret, grantType, scope ) {
        let data = {
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: grantType,
            scope: scope
        };

        return data;
    }

    getDataIdentityServerAcessoCidadao( options, username, password ) {
        let data = {};

        if ( username ) {
            data.username = username;
        }
        if ( password ) {
            data.password = password;
        }

        return angular.extend( {}, options, data );
    }

    getDataIdentityServerSocialNetwork( options, provider, accesstoken ) {
        let data = {};

        if ( provider ) {
            data.provider = provider;
        }

        if ( accesstoken ) {
            data.accesstoken = accesstoken;
        }

        return angular.extend( {}, options, data );
    }

    getDataIdentityServerPhone( options, provider, apiUrl, authHeader ) {
        let data = {};

        data.accesstoken = 'token';

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
     * Executa login na aplicação de acordo com as configurações do settings, usuário e senha.
     */
    signIn() {
        let isData = this.getDataIdentityServer( this.settings.identityServer.clients.espm.id, this.settings.identityServer.clients.espm.secret, 'password', 'openid' );
        isData = this.getDataIdentityServerAcessoCidadao( isData, this.user.name, this.user.password );

        this.$ionicLoading.show();
        this.OAuth2.signIn( isData ).then( () => {
            this.signInSuccess();
        }, () => {
            //TODO: Tratar error
            this.toast.error( {
                title: 'Credenciais inválidas'
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
            let isData = this.getDataIdentityServer( this.settings.identityServer.clients.espmExternalLoginAndroid.id, this.settings.identityServer.clients.espmExternalLoginAndroid.secret, 'customloginexterno', 'openid' );
            isData = this.getDataIdentityServerSocialNetwork( isData, 'Facebook', responseFacebook.authResponse.accessToken );

            this.$ionicLoading.show();
            this.OAuth2.signIn( isData ).then( () => {
                this.signInSuccess();
            }, ( error ) => {
                if ( this.isAccountNotLinked( error.data ) ) {
                    this.showDialogAccountNotLinked();
                } else {
                    this.toast.error( {
                        title: 'Falha no Login'
                    } );
                }
            } )
                .finally( () => {
                    this.$ionicLoading.hide();
                } );
        }, () => {
            this.toast.error( {
                title: '[Facebook] Falha no login'
            } );
        } );
    }

    googleLogin() {
        let options = {
            'scopes': 'profile email', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
            'webClientId': this.settings.googleWebClientId, // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
            'offline': true // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
        };

        this.OAuthGoogle.login( options, ( responseGoogle ) => {
            //Com o token do google, busca o token do acesso cidadão
            let isData = this.getDataIdentityServer( this.settings.identityServer.clients.espmExternalLoginAndroid.id, this.settings.identityServer.clients.espmExternalLoginAndroid.secret, 'customloginexterno', 'openid' );
            isData = this.getDataIdentityServerSocialNetwork( isData, 'Google', responseGoogle.oauthToken );

            this.$ionicLoading.show();
            this.OAuth2.signIn( isData ).then( () => {
                this.signInSuccess();
            }, ( error ) => {
                if ( this.isAccountNotLinked( error.data ) ) {
                    this.showDialogAccountNotLinked();
                } else {
                    this.toast.error( {
                        title: 'Falha no Login'
                    } );
                }
            } )
                .finally( () => {
                    this.$ionicLoading.hide();
                } );
        }, () => {
            this.toast.error( {
                title: '[Google] Falha no login'
            } );
        } );
    }

    digitsLogin() {

        this.OAuthDigits.login( {}, ( responseDigits ) => {
            //Com o token do digits, busca o token do acesso cidadão
            let isData = this.getDataIdentityServer( this.settings.identityServer.clients.espmExternalLoginAndroid.id, this.settings.identityServer.clients.espmExternalLoginAndroid.secret, 'customloginexterno', 'openid' );
            isData = this.getDataIdentityServerPhone( isData, 'Celular', responseDigits[ 'X-Auth-Service-Provider' ], responseDigits[ 'X-Verify-Credentials-Authorization' ] );

            this.$ionicLoading.show();
            this.OAuth2.signIn( isData ).then( () => {
                this.signInSuccess();
            }, ( error ) => {
                if ( this.isAccountNotLinked( error.data ) ) {
                    this.showDialogAccountNotLinked();
                } else {
                    this.toast.error( {
                        title: 'Falha no Login'
                    } );
                }
            } )
                .finally( () => {
                    this.$ionicLoading.hide();
                } );
        }, () => {
            this.toast.error( {
                title: '[SMS] Falha no login'
            } );
        } );
    }

    openUrlForgotPassword() {
        this.$window.open( 'https://acessocidadao.es.gov.br/Conta/SolicitarReinicioSenha', '_system' );
    }
}

export default [
    '$state',
    'OAuth2',
    'OAuthDigits',
    'OAuthFacebook',
    'OAuthGoogle',
    'dialog',
    'toast',
    'settings',
    '$window',
    '$ionicHistory',
    '$ionicLoading',
    LoginController
];
