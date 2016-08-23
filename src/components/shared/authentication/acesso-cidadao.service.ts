import { IWindowService, IHttpService, IPromise, IQService } from 'angular';
import jwt from 'jwt-simple';

import { Token, AcessoCidadaoClaims, LowLevelProtocolClaims, Identity } from './models/index';

/**
 * Classe para autenticação usando IdentityServer3
 * 
 * @export
 * @class AcessoCidadaoService
 */
export class AcessoCidadaoService {

    public static $inject: string[] = [ '$window', '$http', '$localStorage', '$q' ];
    private identityServerUrl: string;

    /** @constructor */
    constructor( private $window: IWindowService,
        private $http: IHttpService,
        private $localStorage,
        private $q: IQService) {
    }


    /**
     * 
     * @param identityServerUrl
     */
    public initialize( identityServerUrl: string): void {
        this.identityServerUrl = identityServerUrl; }

    /**
     * 
     * 
     * @readonly
     * @type {Token}
     */
    public get token(): Token {
        return this.$localStorage.token;
    }

    /**
     * Claims dos protocolos de autenticação utilizado.
     * 
     * @return {LowLevelProtocolClaims}
     */
    public get tokenClaims(): LowLevelProtocolClaims {
        return this.$localStorage.tokenClaims;
    }

    /**
     * Claims do usuário no acesso cidadão
     * 
     * @readonly
     * @type {AcessoCidadaoClaims}
     */
    public get userClaims(): AcessoCidadaoClaims {
        return this.$localStorage.userClaims;
    }

    /**
     * 
     * 
     * @readonly
     * @type {boolean}
     */
    public get authenticated(): boolean {
        return angular.isDefined( this.userClaims ) && !angular.equals( {}, this.userClaims );
    }

    /**
     * Autentica o usuário no acesso cidadão
     * 
     * @param {Identity} data
     * @returns {IPromise<AcessoCidadaoClaims>}
     */
    public signIn( data: Identity ): IPromise<AcessoCidadaoClaims> {
        return this.getToken( data )
            .then( token => {
                this.saveTokenOnLocaStorage( token );
                return this.getAcessoCidadaoUserClaims();
            });
    }


    /**
     * Faz a requisição de um token no IdentityServer3, a partir dos dados fornecidos.
     */
    protected getToken( data: Identity ): IPromise<Token> {
        return this.$http( this.getRequestTokenOptions( data ) )
            .then(( response: { data: Token }) => {
                return response.data;
            });
    }

    public refreshToken( data: Identity ): IPromise<AcessoCidadaoClaims> {
        let token = this.token;
        if ( token ) {
            data.refresh_token = token.refresh_token;
            return this.getToken( data )
                .then( token => {
                    this.saveTokenOnLocaStorage( token );
                    return this.getAcessoCidadaoUserClaims();
                });
        } else {
            return this.$q.reject( new Error( 'Usuário não logado' ) );
        }
    }

    /**
     * Obtém as claims do usuário no acesso cidadão.
     * 
     * @returns
     */
    public getAcessoCidadaoUserClaims(): IPromise<AcessoCidadaoClaims> {
        let userClaimsUrl = `${this.identityServerUrl}/connect/userinfo`;

        return this.$http.get( userClaimsUrl )
            .then(( response: { data: AcessoCidadaoClaims }) => {
                // Check if the object is correct (This request can return the Acesso Cidadão login page)
                if ( angular.isDefined( response.data.sid ) ) {
                    this.$localStorage.userClaims = response.data;
                }

                return response.data;
            });
    }

    /**
     * Persiste informações do token no local storage.
     * 
     * @param {Token} token
     */
    protected saveTokenOnLocaStorage( token: Token ) {
        this.$localStorage.token = token;
        this.$localStorage.tokenClaims = this.getTokenClaims( token );
    }

    /**
     * Faz logout do usuário. Remove o token do localstore e os claims salvos.
     */
    public signOut( success ): void {
        delete this.$localStorage.token;
        delete this.$localStorage.userClaims;
        delete this.$localStorage.tokenClaims;
        success();
    }

    /**
    * Faz o parse do token e retorna os claims do usuário
    * 
    * @return {Claim} Claims do usuário
    */
    protected getTokenClaims( token: Token ): LowLevelProtocolClaims {
        let claims: LowLevelProtocolClaims = undefined;

        if ( angular.isDefined( token ) ) {
            let [ , encodedClaims ] = token.access_token.split( '.' );
            claims = angular.fromJson( this.urlBase64Decode( encodedClaims ) );
        }
        return claims;
    }

    /**
     * Decodifica uma url Base64
     */
    protected urlBase64Decode( encoded: string ): string {

        let output = encoded.replace( '-', '+' ).replace( '_', '/' );

        switch ( output.length % 4 ) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                throw 'Illegal base64url string!';
        }
        return this.$window.atob( output );
    }

    private getRequestTokenOptions( data ) {
        let getTokenUrl = `${this.identityServerUrl}/connect/token`;

        let options: ng.IRequestConfig = {
            url: getTokenUrl,
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            transformRequest: function ( obj ) {
                let str = [];
                for ( let p in obj ) {
                    str.push( encodeURIComponent( p ) + '=' + encodeURIComponent( obj[ p ] ) );
                }
                return str.join( '&' );
            },
            data: data
        };

        return options;
    }
}
