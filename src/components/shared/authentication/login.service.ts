import { Injectable, OnInit } from '@angular/core';
import {
    AcessoCidadaoService,
    DigitsService,
    FacebookService,
    GoogleService,
    Identity,
    AcessoCidadaoIdentity,
    SocialNetworkIdentity,
    PhoneIdentity,
    FacebookAuthResponse,
    DigitsAuthResponse,
    GoogleAuthResponse,
    Settings
} from './../index';

/**
 * Classe para autenticação usando IdentityServer3
 * 
 * @export
 * @class LoginService
 */
@Injectable()
export class LoginService {
    
    /**
     * Creates an instance of LoginService.
     * 
     * @param {AcessoCidadaoService} acessoCidadaoService
     * @param {DigitsService} digitsService
     * @param {FacebookService} facebookService
     * @param {GoogleService} googleService
     * @param {Settings} settings
     * @constructor
     */
    constructor( private acessoCidadaoService: AcessoCidadaoService,
        private digitsService: DigitsService,
        private facebookService: FacebookService,
        private googleService: GoogleService,
        private settings: Settings ) {

        this.activate();
    }


    /**
     * 
     * @private
     */
    private activate(): void {
        this.acessoCidadaoService.initialize( this.settings.identityServer.url );
    }

    public login( username: string, password: string ): Promise<any> {

        let identity: AcessoCidadaoIdentity = {
            client_id: this.settings.identityServer.clients.espm.id,
            client_secret: this.settings.identityServer.clients.espm.secret,
            grant_type: 'password',
            scope: 'openid',
            username: username,
            password: password
        };

        return this.signInAcessoCidadao( identity );
    }

    /**
     * Realiza o login usando o facebook
     * https://github.com/jeduan/cordova-plugin-facebook4
     */
    public facebookLogin( success, error ): void {
        this.facebookService.login( [ 'email', 'public_profile' ], ( authResponse: FacebookAuthResponse ) => {

            let identity: SocialNetworkIdentity = {
                client_id: this.settings.identityServer.clients.espmExternalLoginAndroid.id,
                client_secret: this.settings.identityServer.clients.espmExternalLoginAndroid.secret,
                grant_type: 'customloginexterno',
                scope: 'openid',
                provider: 'Facebook',
                accesstoken: authResponse.accessToken
            };

            success( identity );
        }, error );
    }

    /**
     * Realiza o login usando conta do google
     */
    public googleLogin( success, error ): void {
        let options = {
            'scopes': 'profile email', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
            'webClientId': this.settings.googleWebClientId, // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
            'offline': true // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
        };

        this.googleService.login( options, ( authResponse: GoogleAuthResponse ) => {

            let identity: SocialNetworkIdentity = {
                client_id: this.settings.identityServer.clients.espmExternalLoginAndroid.id,
                client_secret: this.settings.identityServer.clients.espmExternalLoginAndroid.secret,
                grant_type: 'customloginexterno',
                scope: 'openid',
                provider: 'Google',
                accesstoken: authResponse.oauthToken
            };

            success( identity );
        }, error );
    }

    /**
     * Realiza login digits
     */
    public digitsLogin( success, error ): void {
        this.digitsService.login( {}, ( authResponse: DigitsAuthResponse ) => {

            let identity: PhoneIdentity = {
                client_id: this.settings.identityServer.clients.espmExternalLoginAndroid.id,
                client_secret: this.settings.identityServer.clients.espmExternalLoginAndroid.secret,
                grant_type: 'customloginexterno',
                scope: 'openid',
                provider: 'Celular',
                accesstoken: 'token',
                apiUrl: authResponse[ 'X-Auth-Service-Provider' ],
                authHeader: authResponse[ 'X-Verify-Credentials-Authorization' ],
            };

            success( identity );
        }, error );
    }

    /**
     * Efetua login no acesso cidadão usando um identity.
     * 
     * @param {Identity} identity
     */
    public signInAcessoCidadao( identity: Identity ): Promise<any> {
        return this.acessoCidadaoService.signIn( identity );
    }
}
