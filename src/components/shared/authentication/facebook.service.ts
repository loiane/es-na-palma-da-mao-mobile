import { Injectable } from '@angular/core';
import { LocalStorage } from 'angular2-localstorage/WebStorage';
import { FacebookResponse, FacebookAuthResponse } from './models/index';

/**
 * https://github.com/jeduan/cordova-plugin-facebook4
 */
@Injectable()
export class FacebookService {

    @LocalStorage() private storageFacebookAuthResponse: Object = {};
    private get facebookAuthResponse(): FacebookAuthResponse {
        return <FacebookAuthResponse>this.storageFacebookAuthResponse;
    }
    private set facebookAuthResponse( value: FacebookAuthResponse ) {
        this.storageFacebookAuthResponse = value;
    }

    /**
     * Cria uma instância de FacebookService.
     * 
     * @param {any} $window
     * @param {any} $localStorage
     */
    constructor( ) {
    }

    /**
     * 
     * 
     * @param {any} scopes
     * @param {( authResponse: FacebookAuthResponse ) => void} onSuccess
     * @param {( error: any ) => void} onError
     */
    public login( scopes,
                  onSuccess: ( authResponse: FacebookAuthResponse ) => void,
                  onError: ( error: any ) => void ): void {

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
        window.facebookConnectPlugin.login( scopes, ( response: FacebookResponse ) => {
            this.facebookAuthResponse = response.authResponse;
            onSuccess( response.authResponse );
        }, error => {
            onError( error );
        } );
    }

    /**
     * 
     * 
     * @param {any} onSuccess
     * @param {any} onError
     */
    public logout( onSuccess?, onError? ) {
        if ( window.facebookConnectPlugin ) {
            window.facebookConnectPlugin.logout( onSuccess, onError );
        }
    }

    /**
     * 
     * 
     * @param {any} onSuccess
     * @param {any} onError
     */
    public getLoginStatus( onSuccess, onError ) {
        window.facebookConnectPlugin.getLoginStatus( onSuccess, onError );
    }

    /**
     * 
     * 
     * @param {any} options
     * @param {any} onSuccess
     * @param {any} onError
     */
    public showDialog( options, onSuccess, onError ) {
        window.facebookConnectPlugin.showDialog( options, onSuccess, onError );
    }

    /**
     * 
     * 
     * @param {any} requestPath
     * @param {any} permissions
     * @param {any} onSuccess
     * @param {any} onError
     */
    public api( requestPath, permissions, onSuccess, onError ) {
        window.facebookConnectPlugin.api( requestPath, permissions, onSuccess, onError );
    }
}

