import { IHttpService, IPromise } from 'angular';

import { Edition, SearchResult, SearchFilter } from './models/index';
import { ISettings } from '../../shared/settings/index';

export class DioApiService {

    public static $inject: string[] = [ '$http', 'settings' ];

    /**
     * Creates an instance of DioApiService.
     * 
     * @param {IHttpService} $http
     * @param {ISettings} settings
     */
    constructor( private $http: IHttpService, private settings: ISettings ) {}


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
    public search( filter: SearchFilter = { pageNumber: this.settings.pagination.pageNumber, sort: 'date' } ): IPromise<SearchResult[]> {

        let params = angular.extend( {}, filter );

        return this.$http.get( `${this.settings.api.dio}/search`, { params: params } )
                         .then( ( response: { data: SearchResult[] } ) => {
                             return response.data;
                         });
    }
}

