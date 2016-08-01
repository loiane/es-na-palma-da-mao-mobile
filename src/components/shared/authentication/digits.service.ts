import { Injectable } from '@angular/core';
import { CoolLocalStorage } from 'angular2-cool-storage';
import { DigitsAccessToken, DigitsAuthResponse } from './models/index';

/**
 * https://github.com/JimmyMakesThings/cordova-plugin-digits
 */
@Injectable()
export class DigitsService {
    
    private get digitsAuthResponse(): DigitsAccessToken {
        return <DigitsAccessToken>this.localStorage.getObject('storageDigitsAuthResponse');
    }
    private set digitsAuthResponse( value: DigitsAccessToken ) {
        this.localStorage.setObject( 'storageDigitsAuthResponse', value );
    }

    /**
     * Cria uma instância de DigitsService.
     * 
     * @param {*} $window
     * @param {*} $localStorage
     */
    constructor( private localStorage: CoolLocalStorage ) {
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

        options = Object.assign( options, defaultOptions );

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
        window.plugins.digits.authenticate( options, ( authResponse: DigitsAuthResponse ) => {

            this.digitsAuthResponse = this.buildAccessToken( authResponse );

            onSuccess( authResponse );
        }, errorDigits => {
            onError( errorDigits );
        } );
    }


    /**
     * 
     */
    public logout(): void {
        if ( window.plugins && window.plugins.digits ) {
            window.plugins.digits.logout();
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
