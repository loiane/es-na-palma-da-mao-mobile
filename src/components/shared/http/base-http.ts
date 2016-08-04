import { Injectable } from '@angular/core';
import {
    Http,
    Response,
    Request,
    RequestOptions,
    ConnectionBackend,
    RequestOptionsArgs
} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UIStateStore } from '../index';


@Injectable()
export class BaseHttp extends Http {

    /**
     * Creates an instance of AppHttp.
     * 
     * @param {ConnectionBackend} backend
     * @param {RequestOptions} defaultOptions
     */
    constructor( backend: ConnectionBackend, 
                 defaultOptions: RequestOptions, 
                 protected uiStateStore: UIStateStore ) {
        super( backend, defaultOptions );
    }

    /**
     * 
     * 
     * @param {(string | Request)} url
     * @param {RequestOptionsArgs} [options]
     * @returns {Observable<Response>}
     */
    request( url: string | Request, options?: RequestOptionsArgs ): Observable<Response> {
        
        this.uiStateStore.startBackendAction();

        return super.request( url, options )
                    .timeout( 5000, new Error( 'timeout' ) )
                    .retryWhen( attempts => this.retryWhen( attempts ) )
                    .catch( error => this.handleError( error ) )
                    .finally<Response>( () => {
                        this.uiStateStore.endBackendAction();
                    } );
    }


    /**
     * 
     * 
     * @param {string} url
     * @param {RequestOptionsArgs} [options]
     * @returns {Observable<Response>}
     */
    get( url: string, options?: RequestOptionsArgs ): Observable<Response> {
        
        this.uiStateStore.startBackendAction();

        return super.get( url, options )
                    .timeout( 5000, new Error( 'timeout' ) )
                    .retryWhen( attempts => this.retryWhen( attempts ) )
                    .catch( error => this.handleError( error ) )
                    .finally<Response>( () => {
                        this.uiStateStore.endBackendAction();
                    } );
    }


    
    /**
     * 
     * 
     * @param {string} url
     * @param {*} body
     * @param {RequestOptionsArgs} [options]
     * @returns {Observable<Response>}
     */
    post( url: string, body: any, options?: RequestOptionsArgs ): Observable<Response> {

        this.uiStateStore.startBackendAction();

        return super.post( url, body, options )
                    .timeout( 15000, new Error( 'timeout' ) )
                    .catch( error => this.handleError( error ) )
                    .finally<Response>( () => {
                        this.uiStateStore.endBackendAction();
                    } );
    }


    /**
     * 
     * 
     * @private
     * @param {*} error
     */
    private handleError( error: any ) {
        let errMsg = ( error.message ) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error( `handleError: ${errMsg}` );
        return Observable.throw( errMsg );
    }


    /**
     * 
     * 
     * @private
     * @param {any} error
     * @returns {*}
     */
    private retryWhen( errors: Observable<Response> ): any {
        return errors
            .scan( ( errorCount, error ) => {
                if ( errorCount >= 2 || ( error.status >= 400 && error.status < 500 ) ) {
                    throw error;
                }
                return errorCount + 1;
            }, 0 );
    }
}
