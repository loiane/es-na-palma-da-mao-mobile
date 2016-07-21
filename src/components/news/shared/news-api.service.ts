import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { News, NewsDetail } from '../shared/models/index';
import { Settings } from '../../shared/index';

@Injectable()
export class NewsApiService {

    private defaultPage: number = 0;
    private defaultPageSize: number = 10;

    /**
     * Creates an instance of NewsApiService.
     * 
     * @param {Http} http
     * @param {AppSettings} settings
     */
    constructor( private http: Http, private settings: Settings ) {}

    /**
     * 
     * 
     * @private
     * @param {Response} res
     * @returns
     */
    private extractData( res: Response ): any {
        let body = res.json();
        return body.data || {};
    }

    /**
     * 
     * 
     * @private
     * @param {*} error
     */
    private handleError( error: any ) {
        let errMsg = ( error.message ) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error( errMsg ); // log to console instead
        return Observable.throw( errMsg );
    }

    /**
     * 
     * 
     * @param {string} id
     * @returns {Observable<NewsDetail>}
     */
    public getNewsById( id: string ): Observable<NewsDetail> {
        return this.http
                   .get( `${this.settings.api.news}/${id}` )
                   .map( res => <NewsDetail>res.json() )
                   .catch( this.handleError );
    }


    /**
     * 
     * 
     * @returns {Observable<News[]>}
     */
    public getHighlightNews(): Observable<News[]> {
        return this.http
                   .get( `${this.settings.api.news}/highlights` )
                   .map( res => <News[]>res.json() )
                   .catch( this.handleError );
    }


    /**
     * 
     * 
     * @param {any} [options={}]
     * @returns {Observable<News[]>}
     */
    public getNews( options = {}): Observable<News[]> {
        let today = new Date();
        let defaults = {
            origins: [],
            dateMin: new Date( today.getFullYear(), 0, 1, 0 ),   // começo do ano corrente
            dateMax: new Date( today.getFullYear(), 11, 31, 0 ),  // final do ano corrente
            pageNumber: this.defaultPage,
            pageSize: this.defaultPageSize
        };

        // let params = new URLSearchParams();
        // params.set('origins', term); // the user's search value
        // params.set('dateMin', 'opensearch');
        // params.set('format', 'json');
        // params.set('callback', 'JSONP_CALLBACK');

        let params: URLSearchParams = Object.assign( new URLSearchParams(), defaults, options );

        return this.http
                   .get( this.settings.api.news, { search: params } )
                   .map( res => <News[]>res.json() )
                   .catch( this.handleError );
    }


    /**
     * 
     * 
     * @returns {Observable<string[]>}
     */
    public getAvailableOrigins(): Observable<string[]> {
        return this.http
                   .get( `${this.settings.api.news}/origins` )
                   .map( res => <string[]>res.json() )
                   .catch( this.handleError );
    }
}