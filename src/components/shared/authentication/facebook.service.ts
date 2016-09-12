import { FacebookResponse, FacebookAuthResponse } from './models/index';
import { AnswersService } from '../fabric/index';

/**
 * https://github.com/jeduan/cordova-plugin-facebook4
 */
export class FacebookService {

    public static $inject: string[] = [ '$window', '$localStorage', 'answersService' ];

    /**
     * Cria uma instância de FacebookService.
     * 
     * @param {any} $window
     * @param {any} $localStorage
     */
    constructor( private $window, private $localStorage, private answersService: AnswersService ) {
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
        this.$window.facebookConnectPlugin.login( scopes, ( response: FacebookResponse ) => {
            this.$localStorage.facebookAuthResponse = response.authResponse;
            this.answersService.sendLogin( 'Facebook', true, null );
            onSuccess( response.authResponse );
        }, error => {
            this.answersService.sendLogin( 'Facebook', false, null );
            onError( error );
        });
    }

    /**
     * 
     * 
     * @param {any} onSuccess
     * @param {any} onError
     */
    public logout( onSuccess?, onError? ) {
        if ( this.$window.facebookConnectPlugin ) {
            delete this.$localStorage.facebookAuthResponse;
            this.$window.facebookConnectPlugin.logout( onSuccess, onError );
        }
    }

    /**
     * 
     * 
     * @param {any} onSuccess
     * @param {any} onError
     */
    public getLoginStatus( onSuccess, onError ) {
        this.$window.facebookConnectPlugin.getLoginStatus( onSuccess, onError );
    }

    /**
     * 
     * 
     * @param {any} options
     * @param {any} onSuccess
     * @param {any} onError
     */
    public showDialog( options, onSuccess, onError ) {
        this.$window.facebookConnectPlugin.showDialog( options, onSuccess, onError );
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
        this.$window.facebookConnectPlugin.api( requestPath, permissions, onSuccess, onError );
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

