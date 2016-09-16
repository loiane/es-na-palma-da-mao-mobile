import { IPromise, IWindowService, IQService } from 'angular';

import { GoogleAuthResponse } from './models/index';
import { AnswersService } from '../fabric/index';

/**
 * https://github.com/EddyVerbruggen/cordova-plugin-googleplus
 */
export class GoogleService {

    public static $inject: string[] = [ '$window', '$localStorage', '$q', 'answersService' ];

    /**
     * Creates an instance of GoogleService.
     * 
     * @param {IWindowService} $window
     * @param {*} $localStorage
     * @param {IQService} $q
     * @param {AnswersService} answersService
     * 
     * @memberOf GoogleService
     */
    constructor( private $window: IWindowService,
        private $localStorage: any,
        private $q: IQService,
        private answersService: AnswersService ) {
    }

    /**
     * 
     * 
     * @param {any} options
     * @returns {IPromise<GoogleAuthResponse>}
     * 
     * @memberOf GoogleService
     */
    public login( options ): IPromise<GoogleAuthResponse> {
        return this.$q(( resolve, reject ) => {
            this.$window.plugins.googleplus.login( options, ( authResponse: GoogleAuthResponse ) => {
                this.$localStorage.googleAuthResponse = authResponse;
                this.answersService.sendLogin( 'Google', true, undefined );
                resolve( authResponse );
            }, ( error ) => {
                this.answersService.sendLogin( 'Google', false, undefined );
                reject( error );
            });
        });
    }

    /**
     * 
     * 
     * @readonly
     * 
     * @memberOf GoogleService
     */
    public get avatarUrl() {
        if ( angular.isDefined( this.$localStorage.googleAuthResponse ) ) {
            return this.$localStorage.googleAuthResponse.imageUrl;
        }
    }

    /**
     * 
     * 
     * @param {any} options
     * @returns {IPromise<GoogleAuthResponse>}
     * 
     * @memberOf GoogleService
     */
    public trySilentLogin( options ): IPromise<GoogleAuthResponse> {
        return this.$q(( resolve, reject ) => {
            this.$window.plugins.googleplus.trySilentLogin( options, resolve, reject );
        });
    }

    /**
     * 
     * 
     * @returns {IPromise<any>}
     * 
     * @memberOf GoogleService
     */
    public logout(): IPromise<any> {
        return this.$q(( resolve, reject ) => {
            try {
                if ( this.$window.plugins && this.$window.plugins.googleplus ) {
                    delete this.$localStorage.googleAuthResponse;
                    this.$window.plugins.googleplus.logout( resolve );
                }
            } catch ( err ) {
                reject( err );
            }
        });
    }

    /**
     * 
     * 
     * @returns {IPromise<any>}
     * 
     * @memberOf GoogleService
     */
    public disconnect(): IPromise<any> {
        return this.$q(( resolve, reject ) => {
            try {
                this.$window.plugins.googleplus.disconnect( resolve );
            } catch ( err ) {
                reject( err );
            }
        });
    }
}
