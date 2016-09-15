import { DigitsAccessToken, DigitsAuthResponse } from './models/index';
import { AnswersService } from '../fabric/index';

/**
 * https://github.com/JimmyMakesThings/cordova-plugin-digits
 */
export class DigitsService {

    public static $inject: string[] = [ '$window', '$localStorage', 'answersService' ];

    /**
     * Cria uma instância de DigitsService.
     * 
     * @param {*} $window
     * @param {*} $localStorage
     */
    constructor( private $window: any, private $localStorage: any, private answersService: AnswersService ) {
    }

    /**
     * 
     * 
     * @param {*} options
     * @param {( digitsAccessToken: DigitsAccessToken ) => void} onSuccess
     * @param {( error: any ) => void} onError
     */
    public login( options: any,
        onSuccess: ( authResponse: DigitsAuthResponse ) => void,
        onError: ( error: any ) => void ): void {

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
        this.$window.plugins.digits.authenticate( options, ( authResponse: DigitsAuthResponse ) => {
            this.$localStorage.digitsAuthResponse = this.buildAccessToken( authResponse );
            this.answersService.sendLogin( 'Digits', true, undefined );
            onSuccess( authResponse );
        }, errorDigits => {
            this.answersService.sendLogin( 'Digits', false, undefined );
            onError( errorDigits );
        } );
    }


    /**
     * 
     */
    public logout(): void {
        if ( this.$window.plugins && this.$window.plugins.digits ) {
            delete this.$localStorage.digitsAuthResponse;
            this.$window.plugins.digits.logout();
        }
    }


    /**
     * 
     * 
     * @protected
     * @param {authResponse} authResponse
     * @returns {DigitsAccessToken}
     */
    protected buildAccessToken( authResponse: DigitsAuthResponse ): DigitsAccessToken {
        let digitsAccessToken = {};
        authResponse[ 'X-Verify-Credentials-Authorization' ].split( ',' ).forEach( ( item ) => {
            let aux = item.split( '=' );
            digitsAccessToken[ aux[ 0 ] ] = aux[ 1 ].substring( 1, aux[ 1 ].length - 1 );
        } );
        return digitsAccessToken as DigitsAccessToken;
    }
}
