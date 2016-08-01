import { Injectable } from '@angular/core';
import { CoolLocalStorage } from 'angular2-cool-storage';
import { GoogleAuthResponse } from './models/index';

/**
 * https://github.com/EddyVerbruggen/cordova-plugin-googleplus
 */
@Injectable()
export class GoogleService {

    /**
     * LocalStorage variable 
     * @private
     * @type {Object}
     */
    // @LocalStorage() private storageGoogleAuthResponse: Object = {};
    private get googleAuthResponse(): GoogleAuthResponse {
        return <GoogleAuthResponse>this.localStorage.getObject('storageGoogleAuthResponse');
    }
    private set googleAuthResponse( value: GoogleAuthResponse ) {
        this.localStorage.setObject( 'storageGoogleAuthResponse', value );
    }

    /**
     * Creates an instance of GoogleService.
     * 
     */
    constructor( private localStorage: CoolLocalStorage ) {
    }

    /**
     * 
     * 
     * @param {any} options
     * @param {( authResponse: any ) => void} onSuccess
     * @param {( error: any ) => void} onError
     */
    public login( options,
        onSuccess: ( authResponse: GoogleAuthResponse ) => void,
        onError: ( error: any ) => void ): void {

        window.plugins.googleplus.login( options, ( authResponse: GoogleAuthResponse ) => {
            this.googleAuthResponse = authResponse;
            onSuccess( authResponse );
        }, onError );
    }

    /**
     * 
     * 
     * @readonly
     */
    public get avatarUrl() {
        if ( !!this.googleAuthResponse ) {
            return (this.googleAuthResponse).imageUrl;
        }
    }

    /**
     * 
     * 
     * @param {any} options
     * @param {any} onSuccess
     * @param {any} onError
     */
    public trySilentLogin( options, onSuccess, onError ) {
        window.plugins.googleplus.trySilentLogin( options, onSuccess, onError );
    }

    /**
     * 
     * 
     * @param {any} onSuccess
     */
    public logout( onSuccess?) {
        if ( window.plugins && window.plugins.googleplus ) {
            window.plugins.googleplus.logout( onSuccess );
        }
    }

    /**
     * 
     * 
     * @param {any} onSuccess
     */
    public disconnect( onSuccess ) {
        window.plugins.googleplus.disconnect( onSuccess );
    }
}
