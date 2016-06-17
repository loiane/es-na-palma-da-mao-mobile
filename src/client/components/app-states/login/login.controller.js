/** Login Controller */
class LoginController {

    /**
     * @constructor
     */
    constructor( $rootScope, $state, $localStorage, OAuth2, OAuthDigits, OAuthFacebook, OAuthGoogle, dialog, toast, appConfig, $window, $ionicHistory ) {
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

        this.$state.go( 'app.dashboard' );
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

    _signInSucesso() {
        this.user = {};
        this.goToDashboard();
    }

    _getDataIdentityServer( clientId, clientSecret, grantType, scope, username, password, accesstoken ) {
        var data = {
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: grantType,
            scope: scope
        };

        if ( username ) {
            data.username = username;
        }
        if ( password ) {
            data.password = password;
        }
        if ( accesstoken ) {
            data.accesstoken = accesstoken;
        }

        return data;
    }

    /**
     * Executa login na aplicação de acordo com as configurações do AppConfig, usuário e senha.
     */
    signIn() {
        var formData = this._getDataIdentityServer( this.appConfig.identityServer.clients.espm.id, this.appConfig.identityServer.clients.espm.secret, 'password', 'openid', this.user.name, this.user.password );

        this.OAuth2.signIn( formData, ( response ) => {
            this._signInSucesso();
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
            var formData = this._getDataIdentityServer( this.appConfig.identityServer.clients.espmFacebookLoginAndroid.id, this.appConfig.identityServer.clients.espmFacebookLoginAndroid.secret, 'customfacebook', 'openid', null, null, responseFacebook.authResponse.accessToken );

            this.OAuth2.signIn( formData, ( response ) => {
                this._signInSucesso();
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
        var options = {
            //'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
            'webClientId': this.appConfig.googleWebClientId, // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
            'offline': true // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
        };

        this.OAuthGoogle.login( options, ( responseGoogle ) => {
            //Com o token do google, busca o token do acesso cidadão
            var formData = this._getDataIdentityServer( this.appConfig.identityServer.clients.espmGoogleLoginAndroid.id, this.appConfig.identityServer.clients.espmGoogleLoginAndroid.secret, 'customgoogle', 'openid', null, null, responseGoogle.oauthToken );

            this.OAuth2.signIn( formData, ( response ) => {
                this._signInSucesso();
            }, ( error ) => {
                //TODO: Tratar error
                console.log( error );

                this.toast.error( {
                    title: 'Erro no Acesso Cidadão'
                } );
            } );

            this._signInSucesso();
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
            var formData = this._getDataIdentityServer( this.appConfig.identityServer.clients.espm.id, this.appConfig.identityServer.clients.espm.secret, 'customdigits', 'openid', null, null, responseDigits.oauth_token );

            this.OAuth2.signIn( formData, ( response ) => {
                this._signInSucesso();
            }, ( error ) => {
                //TODO: Tratar error
                console.log( error );
                this.toast.error( {
                    title: 'Erro no Acesso Cidadão'
                } );
            } );

            this._signInSucesso();
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
            this.$state.go( 'app' );
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
