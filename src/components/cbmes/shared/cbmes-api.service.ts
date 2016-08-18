import { IHttpService, IPromise } from 'angular';
import { ISettings } from '../../shared/settings/index';
import { Warning } from './models/index';

export class CBMESApiService {

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
     * @param calendars
     * @param options
     * @returns {Array}
     */
    public getWarnings(): IPromise<Warning[]> {
       /* let today = new Date();
        let defaults = {
            origins: [],
            dateMin: new Date( today.getFullYear(), 0, 1, 0 ),   // começo do ano corrente
            dateMax: new Date( today.getFullYear(), 11, 31, 0 ),  // final do ano corrente
            pageNumber: this.settings.pagination.pageNumber,
            pageSize: this.settings.pagination.pageSize
        };

        let params = angular.extend( {}, defaults, options );

        return this.$http.get( this.settings.api.news, { params: params })
            .then(( response: { data: News[] }) => {
                return response.data;
            });*/
    }

}
