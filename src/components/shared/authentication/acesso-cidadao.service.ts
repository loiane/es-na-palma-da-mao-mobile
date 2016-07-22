import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs } from '@angular/http';
import { LocalStorage } from 'angular2-localstorage/WebStorage';
import { Token, AcessoCidadaoClaims, LowLevelProtocolClaims, Identity } from './models/index';

/**
 * Classe para autenticação usando IdentityServer3
 * 
 * @export
 * @class AcessoCidadaoService
 */
@Injectable()
export class AcessoCidadaoService {


    /**
     * Token 
     * @private
     * @type {Object}
     */
    @LocalStorage() private storageToken: Object = {};
    public get token(): Token {
        return <Token>this.storageToken;
    }
    public set token( value: Token ) {
        this.storageToken = value;
    }


    /**
     * TokenClaims
     * @private
     * @type {Object}
     */
    @LocalStorage() private storageTokenClaims: Object = {};
    public get tokenClaims(): LowLevelProtocolClaims {
        return <LowLevelProtocolClaims>this.storageToken;
    }
    public set tokenClaims( value: LowLevelProtocolClaims ) {
        this.storageToken = value;
    }


    /**
     * Claims do usuário no acesso cidadão
     * @private
     * @type {Object}
     */
    @LocalStorage() private storageUserClaims: Object = {};
    public get userClaims(): AcessoCidadaoClaims {
        return <AcessoCidadaoClaims>this.storageToken;
    }
    public set userClaims( value: AcessoCidadaoClaims ) {
        this.storageToken = value;
    }

    private identityServerUrl: string;

    /** @constructor */
    constructor( private http: Http ) {
    }

    /**
     * 
     * @param identityServerUrl
     */
    public initialize( identityServerUrl: string ): void {
        this.identityServerUrl = identityServerUrl;
    }

    /**
     * 
     * 
     * @readonly
     * @type {boolean}
     */
    public get authenticated(): boolean {
        return !!this.userClaims && this.userClaims !== {};
    }

    /**
     * Autentica o usuário no acesso cidadão
     * 
     * @param {Identity} data
     * @returns {IPromise<AcessoCidadaoClaims>}
     */
    public signIn( data: Identity ): Promise<AcessoCidadaoClaims> {
        return this.getToken( data )
            .then( token => {
                this.saveTokenOnLocaStorage( token );
                return this.getAcessoCidadaoUserClaims();
            });
    }


    /**
     * Faz a requisição de um token no IdentityServer3, a partir dos dados fornecidos.
     */
    protected getToken( data: Identity ): Promise<Token> {
        let getTokenUrl = `${this.identityServerUrl}/connect/token`;

        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

       /* let options: RequestOptionsArgs = {
            /*transformRequest: function ( obj ) {
                let str = [];
                for ( let p in obj ) {
                    str.push( encodeURIComponent( p ) + '=' + encodeURIComponent( obj[ p ] ) );
                }
                return str.join( '&' );
            },
        };*/
        return this.http.post( getTokenUrl, data, { headers: headers } )
            .map( response => <Token>response.json().data )
            .toPromise();
    }


    /**
     * Obtém as claims do usuário no acesso cidadão.
     * 
     * @returns
     */
    public getAcessoCidadaoUserClaims(): Promise<AcessoCidadaoClaims> {
        let userClaimsUrl = `${this.identityServerUrl}/connect/userinfo`;

        return this.http.get( userClaimsUrl )
            .map( response => {
                // Check if the object is correct (This request can return the Acesso Cidadão login page)
                let claims = <AcessoCidadaoClaims>response.json().data;
                if ( !!claims.sid ) {
                    this.userClaims = claims;
                }

                return claims;
            })
            .toPromise();
    }


    /**
     * Persiste informações do token no local storage.
     * 
     * @param {Token} token
     */
    protected saveTokenOnLocaStorage( token: Token ) {
        this.token = token;
        this.tokenClaims = this.getTokenClaims( token );
    }


    /**
     * Faz logout do usuário. Remove o token do localstore e os claims salvos.
     */
    public signOut( success ): void {
        delete this.token;
        delete this.userClaims;
        delete this.tokenClaims;
        success();
    }


    /**
    * Faz o parse do token e retorna os claims do usuário
    * 
    * @return {Claim} Claims do usuário
    */
    protected getTokenClaims( token: Token ): LowLevelProtocolClaims {
        let claims: LowLevelProtocolClaims = undefined;

        if ( !!token ) {
            let [ , encodedClaims ] = token.access_token.split( '.' );
            claims = JSON.parse( this.urlBase64Decode( encodedClaims ) );
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
        return window.atob( output );
    }
}
