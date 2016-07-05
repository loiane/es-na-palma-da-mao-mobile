/**
 * https://github.com/JimmyMakesThings/cordova-plugin-digits
 */
class OAuthDigits {

    /**
     *
     */
    constructor( $window, $localStorage ) {
        this.$window = $window;
        this.$localStorage = $localStorage;
    }

    buildDigitsObject( data ) {
        let obj = {};
        data['X-Verify-Credentials-Authorization'].split( ',' ).forEach( ( item ) => {
            let aux = item.split( '=' );
            obj[aux[0]] = aux[1].substring( 1, aux[1].length - 1 );
        } );
        return obj;
    }

    login( options, success, error ) {
        let defaultOptions = {
            accentColor: '#ff0000',
            backgroundColor: '#ffffff'
        };

        options = angular.extend( options, defaultOptions );

        /**
         * Exemplo de objeto retornado pelo digits
         *
         *  {
                X-Auth-Service-Provider: "https://api.digits.com/1.1/sdk/account.json"
                X-Verify-Credentials-Authorization: "OAuth oauth_consumer_key="mtlaFB935auxWWNfPv6TZGK87",
                                                     oauth_nonce="1343188175196443787286983593339452",
                                                     oauth_signature="5V%2BhB6CmUNYMCCigaRPNBCoASvw%3D",
                                                     oauth_signature_method="HMAC-SHA1",
                                                     oauth_timestamp="1464901453",
                                                     oauth_token="3319052116-Qp7NfLhxMtKV2AnxygthRPV3xB0UgorOdMhxAas",
                                                     oauth_version="1.0""
            }
         */


        this.$window.plugins.digits.authenticate( options, ( responseDigits ) => {
            var objOAuth = this.buildDigitsObject( responseDigits );

            //Salva token
            this.$localStorage.digitsRawAccessToken = responseDigits;
            this.$localStorage.digitsAccessToken = objOAuth;

            success( responseDigits );
        }, ( errorDigits ) => {
            error( errorDigits );
        } );
    }

    logout() {
        if ( this.$window.plugins && this.$window.plugins.digits ) {
            this.$window.plugins.digits.logout();
        }
    }
}

export default ['$window', '$localStorage', OAuthDigits];
