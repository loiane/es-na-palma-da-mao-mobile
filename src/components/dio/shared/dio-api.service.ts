import { IHttpService, IPromise } from 'angular';
import { Edition, SearchResult, SearchFilter } from './models/index';

export class DioApiService {

    public static $inject: string[] = [ '$http', 'settings' ];

    /**
     *
     * @param {Object} $http - angular $http service
     */
    constructor( private $http: IHttpService, private settings ) {}


    /**
     * 
     * 
     * @returns {IPromise<Edition[]>}
     */
    public getLatestEditions(): IPromise<Edition[]> {
        return this.$http
                   .get( `${this.settings.api.dio}/latest` )
                   .then( ( response: { data: Edition[] } ) => response.data );
    }

    /**
     * 
     * 
     * @param {SearchFilter} [filter={ pageNumber: 0, sort: 'date' }]
     * @returns {IPromise<SearchResult[]>}
     */
    public search( filter: SearchFilter = { pageNumber: 0, sort: 'date' } ): IPromise<SearchResult[]> {

        let params = angular.extend( {}, filter );

        return this.$http.get( `${this.settings.api.dio}/search`, { params: params } )
                         .then( ( response: { data: SearchResult[] } ) => {
                             return response.data;
                         });
    }
}

