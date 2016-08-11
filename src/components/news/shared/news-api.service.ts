import { IHttpService, IPromise } from 'angular';
import { News, NewsDetail, Filter } from '../shared/models/index';

export class NewsApiService {

    public static $inject: string[] = [ '$http', 'settings' ];

    /**
     *
     * @param {Object} $http - angular $http service
     */
    constructor( private $http: IHttpService, private settings ) {
    }

    /**
     *
     * @returns {*}
     */
    public getNewsById( id: string ): IPromise<NewsDetail> {
        return this.$http
                   .get( `${this.settings.api.news}/${id}` )
                   .then( ( response: { data: NewsDetail } ) => response.data );
    }

    /**
     *
     * @returns {*}
     */
    public getHighlightNews(): IPromise<News[]> {
        return this.$http
                   .get( `${this.settings.api.news}/highlights` )
                   .then( ( response: { data: News[] } ) => response.data );
    }

    /**
     *
     * @param calendars
     * @param options
     * @returns {Array}
     */
    public getNews( options: Filter = {} ): IPromise<News[]> {
        let today = new Date();
        let defaults = {
            origins: [],
            dateMin: new Date( today.getFullYear(), 0, 1, 0 ),   // começo do ano corrente
            dateMax: new Date( today.getFullYear(), 11, 31, 0 ),  // final do ano corrente
            pageNumber: this.settings.pagination.pageNumber,
            pageSize: this.settings.pagination.pageSize
        };

        let params = angular.extend( {}, defaults, options );

        return this.$http.get( this.settings.api.news, { params: params } )
                   .then(  ( response: { data: News[] } ) => {
                       return response.data;
                   } );
    }

    /**
     *
     * @returns {*}
     */
    public getAvailableOrigins(): IPromise<string[]> {
        return this.$http
                   .get( `${this.settings.api.news}/origins` )
                   .then(  ( response: { data: string[] } ) => response.data );
    }
}
