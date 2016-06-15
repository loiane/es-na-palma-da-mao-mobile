/**
 * https://github.com/jeduan/cordova-plugin-facebook4
 */
class OAuthFacebook {

    /**
     *
     */
    constructor( $window, $localStorage ) {
        this.$window = $window;
        this.$localStorage = $localStorage;
    }

    /**
     *
     */
    login( scopes, success, error ) {
        /** Exemplo do objeto retornado pelo plugin de login nativo do facebook
         * {
                status: "connected",
                authResponse: {
                    session_key: true,
                    accessToken: "<long string>",
                    expiresIn: 5183979,
                    sig: "...",
                    secret: "...",
                    userID: "634565435"
                }
            }

         //Buscar Token
         this.$window.facebookConnectPlugin.getAccessToken( function( token ) { } );
         } );
         */

        this.$window.facebookConnectPlugin.login( scopes, ( responseFacebook ) => {
            //Salva o token do facebook
            this.$localStorage.facebookAccessToken = responseFacebook.authResponse;

            success( responseFacebook );
        }, ( errorFacebook ) => {
            error( errorFacebook );
        } );
    }

    logout( success, error ) {
        this.$window.facebookConnectPlugin.logout( success, error );
    }

    getLoginStatus( success, error ) {
        this.$window.facebookConnectPlugin.getLoginStatus( success, error );
    }

    showDialog( options, success, error ) {
        this.$window.facebookConnectPlugin.showDialog( options, success, error );
    }

    graphApi( requestPath, permissions, success, error ) {
        this.$window.facebookConnectPlugin.api( requestPath, permissions, success, error );
    }
}

export default [ '$window', '$localStorage', OAuthFacebook ];
