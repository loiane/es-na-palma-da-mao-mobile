import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestOptionsArgs, ConnectionBackend, RequestOptions, Response } from '@angular/http';
import { CoolLocalStorage } from 'angular2-cool-storage';

import { Token, AcessoCidadaoClaims, LowLevelProtocolClaims, Identity } from './models/index';
import { AuthorizedHttp } from '../../shared/index';

/**
 * Classe para autenticação usando IdentityServer3
 * 
 * @export
 * @class AcessoCidadaoService
 */
@Injectable()
export class AcessoCidadaoService {

    
    /**
     * 
     * 
     * @type {Token}
     */
    public get token(): Token {
        return <Token>this.localStorage.getObject('storageToken');
    }

    /**
     * 
     */
    public set token( value: Token ) {
        this.localStorage.setObject( 'storageToken', value );
    }

    /**
     * 
     * 
     * @type {LowLevelProtocolClaims}
     */
    public get tokenClaims(): LowLevelProtocolClaims {
        return <LowLevelProtocolClaims>this.localStorage.getObject('storageTokenClaims');
    }

    
    /**
     * 
     */
    public set tokenClaims( value: LowLevelProtocolClaims ) {
        this.localStorage.setObject( 'storageTokenClaims', value );
    }

    
    /**
     * 
     * 
     * @type {AcessoCidadaoClaims}
     */
    public get userClaims(): AcessoCidadaoClaims {
        return <AcessoCidadaoClaims>this.localStorage.getObject('storageUserClaims');
    }

    
    /**
     * 
     */
    public set userClaims( value: AcessoCidadaoClaims ) {
        this.localStorage.setObject( 'storageUserClaims', value );
    }

    
    /**
     * 
     * 
     * @private
     * @type {string}
     */
    private identityServerUrl: string;


    
    /**
     * Creates an instance of AcessoCidadaoService.
     * 
     * @param {Http} http
     * @param {AuthorizedHttp} authHttp
     * @param {CoolLocalStorage} localStorage
     */
    constructor( private http: Http, private authHttp: AuthorizedHttp, private localStorage: CoolLocalStorage ) {
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
     * 
     * 
     * @private
     * @param {any} obj
     * @returns
     */
    private getBody( obj ) {
        let str = [];
        for ( let p in obj ) {
            str.push( encodeURIComponent( p ) + '=' + encodeURIComponent( obj[ p ] ) );
        }
        return str.join( '&' );
    };

    /**
     * Faz a requisição de um token no IdentityServer3, a partir dos dados fornecidos.
     */
    protected getToken( data: Identity ): Promise<Token> {
        let tokenUrl = this.identityServerUrl + '/connect/token';

        let headers = new Headers();
        headers.append( 'Content-Type', 'application/x-www-form-urlencoded' );

        return this.http.post( tokenUrl, this.getBody( data ), { headers: headers })
                        .map( response => <Token>response.json() )
                        .toPromise();
    }


    /**
     * Obtém as claims do usuário no acesso cidadão.
     * 
     * @returns
     */
    public getAcessoCidadaoUserClaims(): Promise<AcessoCidadaoClaims> {
        let userClaimsUrl = this.identityServerUrl + '/connect/userinfo';

        return this.authHttp.get( userClaimsUrl )
                    .map( response => {
                        // Check if the object is correct (This request can return the Acesso Cidadão login page)
                        let claims = <AcessoCidadaoClaims>response.json();
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
