import { IHttpService, IPromise } from 'angular';
import { Edition, SearchResult } from './models/index';

export class DioApiService {

    public static $inject: string[] = [ '$http', 'settings' ];

    /**
     *
     * @param {Object} $http - angular $http service
     */
    constructor( private $http: IHttpService, private settings ) {
    }


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
     * @param {any} [options={}]
     * @returns {IPromise<SearchResult[]>}
     */
    public search( options = {} ): IPromise<SearchResult[]> {

        let defaults = {
            // query:
            // dateMin:
            // dateMa;
            pageNumber: 0,
            sort: 'date' // or 'relevance'
        };

        let params = angular.extend( {}, defaults, options );

        // https://api.es.gov.br/dio/search?query=<texto pesquisa>&dateMin=<data inicio>&dateMax=<dataFim>&page=<pagina>&sort=<ordenacao [date | relevance]>

        return this.$http.get( this.settings.api.dio, { params: params } )
                         .then( ( response: { data: SearchResult[] } ) => {
                             return response.data;
                         });
    }
}

