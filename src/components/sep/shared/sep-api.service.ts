import { IHttpService, IPromise } from 'angular';
import { Process } from './models/index';

export class SepApiService {

    public static $inject: string[] = [ '$http', 'settings' ];

    /**
     * @param {Object} $http - angular $http service
     * @param {Object} settings - application settings
     * @constructor
     */
    constructor( private $http: IHttpService, private settings ) {
    }

    /**
     *
     * @param {string} procNumber - process number
     * @returns {IPromise<Process[]>}
     */
    public getProcessByNumber( procNumber: string ): IPromise<Process> {
        return this.$http
                   .get( `${this.settings.api.sep}/${procNumber || ''}` )
                   .then( ( response: { data: Process } ) => response.data );
    }
}
