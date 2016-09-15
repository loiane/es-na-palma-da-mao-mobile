import { GoogleAuthResponse } from './models/index';
import { AnswersService } from '../fabric/index';

/**
 * https://github.com/EddyVerbruggen/cordova-plugin-googleplus
 */
export class GoogleService {

    public static $inject: string[] = [ '$window', '$localStorage', 'answersService' ];

    /**
     * Cria uma instância de GoogleService.
     * 
     * @param {*} $window
     * @param {*} $localStorage
     */
    constructor( private $window: Window, private $localStorage: any, private answersService: AnswersService ) {
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

        this.$window.plugins.googleplus.login( options, ( authResponse: GoogleAuthResponse ) => {
            this.$localStorage.googleAuthResponse = authResponse;
            this.answersService.sendLogin( 'Google', true, undefined );
            onSuccess( authResponse );
        }, ( error ) => {
            this.answersService.sendLogin( 'Google', false, undefined );
            onError( error );
        } );
    }

    /**
     * 
     * 
     * @readonly
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
     * @param {any} onSuccess
     * @param {any} onError
     */
    public trySilentLogin( options, onSuccess, onError ) {
        this.$window.plugins.googleplus.trySilentLogin( options, onSuccess, onError );
    }

    /**
     * 
     * 
     * @param {any} onSuccess
     */
    public logout( onSuccess?) {
        if ( this.$window.plugins && this.$window.plugins.googleplus ) {
            delete this.$localStorage.googleAuthResponse;
            this.$window.plugins.googleplus.logout( onSuccess );
        }
    }

    /**
     * 
     * 
     * @param {any} onSuccess
     */
    public disconnect( onSuccess ) {
        this.$window.plugins.googleplus.disconnect( onSuccess );
    }
}
