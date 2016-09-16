import { IPromise } from 'angular';

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
    AcessoCidadaoClaims,
    Token
} from 'index';
import { ISettings } from '../settings/index';

/**
 * Facade de autenticação consumido por toda a aplicação
 * 
 * @export
 * @class AuthenticationService
 */
export class AuthenticationService {

    public static $inject: string[] = [
        'acessoCidadaoService',
        'digitsService',
        'facebookService',
        'googleService',
        'settings'
    ];

    /**
     * Creates an instance of AuthenticationService.
     * 
     * @param {AcessoCidadaoService} acessoCidadaoService
     * @param {DigitsService} digitsService
     * @param {FacebookService} facebookService
     * @param {GoogleService} googleService
     * @param {ISettings} settings
     * 
     * @memberOf AuthenticationService
     */
    constructor( private acessoCidadaoService: AcessoCidadaoService,
        private digitsService: DigitsService,
        private facebookService: FacebookService,
        private googleService: GoogleService,
        private settings: ISettings ) {
        this.activate();
    }

    /**
     * 
     * @private
     */
    private activate(): void {
        this.acessoCidadaoService.initialize( this.settings.identityServer.url );
    }

    /**
     * 
     * 
     * @param {string} username
     * @param {string} password
     * @returns {IPromise<AcessoCidadaoClaims>}
     * 
     * @memberOf AuthenticationService
     */
    public signInWithCredentials( username: string, password: string ): IPromise<AcessoCidadaoClaims> {

        let identity: AcessoCidadaoIdentity = {
            client_id: this.settings.identityServer.clients.espm.id,
            client_secret: this.settings.identityServer.clients.espm.secret,
            grant_type: 'password',
            scope: this.settings.identityServer.defaultScopes,
            username: username,
            password: password
        };

        return this.signInWithIdentity( identity );
    }

    /**
     * Efetua login no acesso cidadão usando um identity.
     * 
     * @param {Identity} identity
     */
    public signInWithIdentity( identity: Identity ): IPromise<AcessoCidadaoClaims> {
        return this.acessoCidadaoService.signIn( identity );
    }


    /**
     * 
     * 
     * @param {*} success
     * @returns {void}
     */
    public signOut( success: any ): void {
        this.facebookService.logout();
        this.googleService.logout();
        this.digitsService.logout(); // TODO: Verificar se precisa mesmo do logout do Digits

        return this.acessoCidadaoService.signOut( success );
    }

    /**
     * Realiza o login usando o facebook
     * https://github.com/jeduan/cordova-plugin-facebook4
     * 
     * @returns {IPromise<SocialNetworkIdentity>}
     * 
     * @memberOf AuthenticationService
     */
    public facebookLogin(): IPromise<SocialNetworkIdentity> {
        return this.facebookService.login( [ 'email', 'public_profile' ] ).then(( authResponse: FacebookAuthResponse ) => {

            let identity: SocialNetworkIdentity = {
                client_id: this.settings.identityServer.clients.espmExternalLoginAndroid.id,
                client_secret: this.settings.identityServer.clients.espmExternalLoginAndroid.secret,
                grant_type: 'customloginexterno',
                scope: this.settings.identityServer.defaultScopes,
                provider: 'Facebook',
                accesstoken: authResponse.accessToken
            };

            return identity;
        });
    }

    /**
     * Realiza o login usando conta do google
     * 
     * @returns {IPromise<SocialNetworkIdentity>}
     * 
     * @memberOf AuthenticationService
     */
    public googleLogin(): IPromise<SocialNetworkIdentity> {
        let options = {
            scopes: 'profile email', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
            webClientId: this.settings.googleWebClientId, // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
            offline: true // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
        };

        return this.googleService.login( options )
            .then(( authResponse: GoogleAuthResponse ) => {

                let identity: SocialNetworkIdentity = {
                    client_id: this.settings.identityServer.clients.espmExternalLoginAndroid.id,
                    client_secret: this.settings.identityServer.clients.espmExternalLoginAndroid.secret,
                    grant_type: 'customloginexterno',
                    scope: this.settings.identityServer.defaultScopes,
                    provider: 'Google',
                    accesstoken: authResponse.idToken
                };

                return identity;
            });
    }

    /**
     * Realiza login digits
     * 
     * @returns {IPromise<PhoneIdentity>}
     * 
     * @memberOf AuthenticationService
     */
    public digitsLogin(): IPromise<PhoneIdentity> {
        return this.digitsService.login( {}).then(( authResponse: DigitsAuthResponse ) => {

            let identity: PhoneIdentity = {
                client_id: this.settings.identityServer.clients.espmExternalLoginAndroid.id,
                client_secret: this.settings.identityServer.clients.espmExternalLoginAndroid.secret,
                grant_type: 'customloginexterno',
                scope: this.settings.identityServer.defaultScopes,
                provider: 'Celular',
                accesstoken: 'token',
                apiUrl: authResponse[ 'X-Auth-Service-Provider' ],
                authHeader: authResponse[ 'X-Verify-Credentials-Authorization' ]
            };

            return identity;
        });
    }

    /**
     * 
     * 
     * @returns {IPromise<{}>}
     */
    public refreshTokenIfNeeded(): IPromise<{}> {
        return this.acessoCidadaoService.refreshTokenIfNeeded();
    }

    /**
     * 
     * 
     * @returns {IPromise<{}>}
     */
    public refreshToken(): IPromise<{}> {
        return this.acessoCidadaoService.refreshToken();
    }

    /**
     * 
     * 
     * @returns {Boolean}
     */
    public get isAuthenticated(): boolean {
        return this.acessoCidadaoService.authenticated;
    }

    /**
     * 
     * 
     * @readonly
     * @type {boolean}
     */
    public get user(): AcessoCidadaoClaims {
        return this.acessoCidadaoService.userClaims;
    }

    /**
     * 
     * 
     * @readonly
     * @type {Token}
     */
    public get token(): Token {
        return this.acessoCidadaoService.token;
    }
}
