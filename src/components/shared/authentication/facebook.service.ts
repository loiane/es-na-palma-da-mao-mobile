import { IPromise, IWindowService, IQService } from 'angular';

import { FacebookResponse, FacebookAuthResponse } from './models/index';
import { AnswersService } from '../fabric/index';

/**
 * https://github.com/jeduan/cordova-plugin-facebook4
 */
export class FacebookService {

    public static $inject: string[] = [ '$window', '$localStorage', '$q', 'answersService' ];

    /**
     * Creates an instance of FacebookService.
     * 
     * @param {IWindowService} $window
     * @param {*} $localStorage
     * @param {IQService} $q
     * @param {AnswersService} answersService
     * 
     * @memberOf FacebookService
     */
    constructor( private $window: IWindowService,
        private $localStorage: any,
        private $q: IQService,
        private answersService: AnswersService ) {
    }

    /**
     * 
     * 
     * @param {any} scopes
     * @returns {IPromise<FacebookAuthResponse>}
     * 
     * @memberOf FacebookService
     */
    public login( scopes ): IPromise<FacebookAuthResponse> {

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
         */

        return this.$q(( resolve, reject ) => {
            this.$window.facebookConnectPlugin.login( scopes, ( response: FacebookResponse ) => {
                this.$localStorage.facebookAuthResponse = response.authResponse;
                this.answersService.sendLogin( 'Facebook', true, undefined );
                resolve( response.authResponse );
            }, error => {
                this.answersService.sendLogin( 'Facebook', false, undefined );
                reject( error );
            });
        });
    }

    /**
     * 
     * 
     * @returns {IPromise<any>}
     * 
     * @memberOf FacebookService
     */
    public logout(): IPromise<any> {
        return this.$q(( resolve, reject ) => {
            if ( this.$window.facebookConnectPlugin ) {
                delete this.$localStorage.facebookAuthResponse;
                this.$window.facebookConnectPlugin.logout( resolve, reject );
            }
        });
    }

    /**
     * 
     * 
     * @returns {IPromise<any>}
     * 
     * @memberOf FacebookService
     */
    public getLoginStatus(): IPromise<any> {
        return this.$q(( resolve, reject ) => {
            this.$window.facebookConnectPlugin.getLoginStatus( resolve, reject );
        });
    }

    /**
     * 
     * 
     * @param {any} options
     * @returns {IPromise<any>}
     * 
     * @memberOf FacebookService
     */
    public showDialog( options ): IPromise<any> {
        return this.$q(( resolve, reject ) => {
            this.$window.facebookConnectPlugin.showDialog( options, resolve, reject );
        });
    }

    /**
     * 
     * 
     * @param {any} requestPath
     * @param {any} permissions
     * @returns {IPromise<any>}
     * 
     * @memberOf FacebookService
     */
    public api( requestPath, permissions ): IPromise<any> {
        return this.$q(( resolve, reject ) => {
            this.$window.facebookConnectPlugin.api( requestPath, permissions, resolve, reject );
        });
    }

    /**
     * 
     * 
     * @readonly
     */
    public get avatarUrl() {
        if ( angular.isDefined( this.$localStorage.facebookAuthResponse ) ) {
            return `https://graph.facebook.com/v2.7/${this.$localStorage.facebookAuthResponse.userID}/picture?type=normal`;
        }
    }
}

