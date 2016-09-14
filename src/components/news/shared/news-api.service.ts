import { IHttpService, IPromise } from 'angular';
import { ISettings } from '../../shared/settings/index';
import { News, NewsDetail, Filter, Pagination } from '../shared/models/index';

export class NewsApiService {

    public static $inject: string[] = [ '$http', 'settings' ];

    /**
     * Creates an instance of NewsApiService.
     * 
     * @param {IHttpService} $http
     * @param {ISettings} settings
     */
    constructor( private $http: IHttpService, private settings: ISettings ) {
    }

    /**
     *
     * @returns {*}
     */
    public getNewsById( id: string ): IPromise<NewsDetail> {
        return this.$http
            .get( `${this.settings.api.news}/${id}` )
            .then(( response: { data: NewsDetail }) => response.data );
    }

    /**
     *
     * @returns {*}
     */
    public getHighlightNews(): IPromise<News[]> {
        return this.$http
            .get( `${this.settings.api.news}/highlights` )
            .then(( response: { data: News[] }) => response.data );
    }

    /**
     *
     * @param calendars
     * @param options
     * @returns {Array}
     */
    public getNews( filter: Filter, pagination: Pagination ): IPromise<News[]> {
        let defaults = {
            origins: [],
            pageNumber: this.settings.pagination.pageNumber,
            pageSize: this.settings.pagination.pageSize
        };

        let params = angular.extend( {}, defaults, filter, pagination );

        return this.$http.get( this.settings.api.news, { params: params })
            .then(( response: { data: News[] }) => {
                return response.data;
            });
    }

    /**
     *
     * @returns {*}
     */
    public getAvailableOrigins(): IPromise<string[]> {
        return this.$http
            .get( `${this.settings.api.news}/origins` )
            .then(( response: { data: string[] }) => response.data );
    }
}
