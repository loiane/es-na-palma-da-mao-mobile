import { IPromise, IQService } from 'angular';
import jwt from 'jwt-simple';

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
    AcessoCidadaoClaims
} from 'index';
import { ISettings } from '../settings/index';

/**
 * Classe para autenticação usando IdentityServer3
 * 
 * @export
 * @class LoginService
 */
export class LoginService {

    public static $inject: string[] = [ 'acessoCidadaoService',
        'digitsService',
        'facebookService',
        'googleService',
        'settings',
        '$localStorage',
        '$q' ];

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
        private settings: ISettings,
        private $localStorage: any,
        private $q: IQService ) {

        this.activate();
    }

    /**
     * 
     * @private
     */
    private activate(): void {
        this.acessoCidadaoService.initialize( this.settings.identityServer.url );
    }

    public login( username: string, password: string ): IPromise<AcessoCidadaoClaims> {

        let identity: AcessoCidadaoIdentity = {
            client_id: this.settings.identityServer.clients.espm.id,
            client_secret: this.settings.identityServer.clients.espm.secret,
            grant_type: 'password',
            scope: this.settings.identityServer.defaultScopes,
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
                scope: this.settings.identityServer.defaultScopes,
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
            scopes: 'profile email', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
            webClientId: this.settings.googleWebClientId, // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
            offline: true // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
        };

        this.googleService.login( options, ( authResponse: GoogleAuthResponse ) => {

            let identity: SocialNetworkIdentity = {
                client_id: this.settings.identityServer.clients.espmExternalLoginAndroid.id,
                client_secret: this.settings.identityServer.clients.espmExternalLoginAndroid.secret,
                grant_type: 'customloginexterno',
                scope: this.settings.identityServer.defaultScopes,
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
                scope: this.settings.identityServer.defaultScopes,
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
    public signInAcessoCidadao( identity: Identity ): IPromise<AcessoCidadaoClaims> {
        return this.acessoCidadaoService.signIn( identity );
    }

    public signOut( success: any ): void {
        this.facebookService.logout();
        this.googleService.logout();
        this.digitsService.logout(); // TODO: Verificar se precisa mesmo do logout do Digits

        return this.acessoCidadaoService.signOut( success );
    }

    public refreshTokenAcessoCidadao(): IPromise<AcessoCidadaoClaims> {
        let identity: AcessoCidadaoIdentity = {
            client_id: this.settings.identityServer.clients.espm.id,
            client_secret: this.settings.identityServer.clients.espm.secret,
            grant_type: 'refresh_token',
            scope: this.settings.identityServer.defaultScopes
        };
        return this.acessoCidadaoService.refreshToken( identity );
    }

    public refreshTokenAcessoCidadaoIfNeeded(): IPromise<{}> {
        let tokenInfo = this.$localStorage.tokenClaims;
        let token = this.$localStorage.token;
        let currentDate = new Date();

        return this.$q(( resolve, reject ) => {
            if ( tokenInfo ) {
                let timeDifference = tokenInfo.exp * 1000 - currentDate.getTime();
                if ( timeDifference > 0 ) {
                    resolve();
                }

                // Check if it's time to refresh the token based on the token expiration date.
                // token.expires_in * 500 = ( token expiration time * 1000 / 2 )
                if ( timeDifference < token.expires_in * 500 ) {
                    this.refreshTokenAcessoCidadao()
                        .then(() => {
                            if ( timeDifference <= 0 ) {
                                resolve();
                            }
                        })
                        .catch(() => {
                            // Even if there's a problem refreshing only send to home if the token is completelly expired 
                            if ( timeDifference <= 0 ) {
                                console.log('reject catch');
                                this.signOut(() => reject() );
                            }
                        });
                }
            } else {
                console.log('reject token null');
                this.signOut(() => reject() );
            }
        });
    }

    /**
     * 
     * 
     * @returns {Boolean}
     */
    public get isAuthenticated() {
        let token = this.$localStorage.token;

        if ( !token ) {
            return false;
        }

        let decodedToken = jwt.decode( token, this.settings.identityServer.publicKey );
        if ( !!decodedToken.error ) {
            return false;
        }

        return true;
    }
}
