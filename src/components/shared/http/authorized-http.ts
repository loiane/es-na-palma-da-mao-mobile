import { Injectable } from '@angular/core';
import { 
    Http, 
    RequestOptionsArgs, 
    ConnectionBackend, 
    RequestOptions, 
    Request, 
    Response, 
    Headers 
} from '@angular/http';
import { CoolLocalStorage } from 'angular2-cool-storage';
import { Observable } from 'rxjs/Observable';
import { Token, BaseHttp, UIStateStore } from '../index';


@Injectable()
export class AuthorizedHttp extends BaseHttp {
    
    /**
     * Token 
     * @private
     * @type {Object}
     */
    public get token(): Token {
        return <Token>this.localStorage.getObject('storageToken');
    }

    
    /**
     * Creates an instance of AuthorizedHttp.
     * 
     * @param {ConnectionBackend} backend
     * @param {RequestOptions} defaultOptions
     * @param {CoolLocalStorage} localStorage
     */
    constructor( backend: ConnectionBackend, 
                 defaultOptions: RequestOptions, 
                 uiStateStore: UIStateStore, 
                 protected localStorage: CoolLocalStorage ) {
        super( backend, defaultOptions, uiStateStore );
    }
    
    /**
     * 
     * 
     * @param {string} url
     * @param {RequestOptionsArgs} [options=new RequestOptions]
     * @returns {Observable<Response>}
     */
    get( url: string, options: RequestOptionsArgs = new RequestOptions ): Observable<Response> {
        options.headers = options.headers || new Headers();
        if ( !options.headers.has('Authorization') ) {
            options.headers.append( 'Authorization', 'Bearer ' + this.token.access_token  );
        }
        return super.get( url, options );
    }
}
