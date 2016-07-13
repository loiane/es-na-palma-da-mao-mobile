import {GoogleAuthResponse} from './models/index';
/**
 * https://github.com/EddyVerbruggen/cordova-plugin-googleplus
 */
export class GoogleService {

    public static $inject: string[] = [ '$window', '$localStorage' ];

    /**
     * Cria uma instância de GoogleService.
     * 
     * @param {*} $window
     * @param {*} $localStorage
     */
    constructor( private $window: any, private $localStorage: any ) {
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
                onSuccess( authResponse );
            }, onError );
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
    public logout( onSuccess ) {
        if ( this.$window.plugins && this.$window.plugins.googleplus ) {
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
