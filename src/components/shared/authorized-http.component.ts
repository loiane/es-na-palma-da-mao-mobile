import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, ConnectionBackend, RequestOptions, Request, Response, Headers } from '@angular/http';
import { CoolLocalStorage } from 'angular2-cool-storage';
import { Token } from './authentication/models/index';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthorizedHttp extends Http {
    /**
     * Token 
     * @private
     * @type {Object}
     */
    public get token(): Token {
        return <Token>this.localStorage.getObject('storageToken');
    }

    constructor( backend: ConnectionBackend, defaultOptions: RequestOptions, private localStorage: CoolLocalStorage ) {
        super( backend, defaultOptions );
    }

    request( url: string | Request, options?: RequestOptionsArgs ): Observable<Response> {
        console.log( 'request...' );
        return super.request( url, options );
    }

    get( url: string, options: RequestOptionsArgs = new RequestOptions ): Observable<Response> {
        options.headers = options.headers || new Headers();
        if ( !options.headers.has('Authorization') ) {
            options.headers.append( 'Authorization', 'Bearer ' + this.token.access_token  );
        }
        return super.get( url, options );
    }

    /**
     * Performs a request with `post` http method.
     */
    // post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>;
    /**
     * Performs a request with `put` http method.
     */
    // put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>;
    /**
     * Performs a request with `delete` http method.
     */
    // delete(url: string, options?: RequestOptionsArgs): Observable<Response>;
    /**
     * Performs a request with `patch` http method.
     */
    // patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>;
    /**
     * Performs a request with `head` http method.
     */
    // head(url: string, options?: RequestOptionsArgs): Observable<Response>;
}
