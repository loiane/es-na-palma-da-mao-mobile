import { IHttpService, IPromise } from 'angular';

import { Process } from './models/index';
import { ISettings } from '../../shared/settings/index';

export class SepApiService {

    public static $inject: string[] = [ '$http', 'settings' ];

    /**
     * Creates an instance of SepApiService.
     * 
     * @param {IHttpService} $http
     * @param {ISettings} settings
     */
    constructor( private $http: IHttpService, private settings: ISettings ) {
    }

    /**
     *
     * @param {string} procNumber - process number
     * @returns {IPromise<Process[]>}
     */
    public getProcessByNumber( procNumber: string = '' ): IPromise<Process> {
        return this.$http
                   .get( `${this.settings.api.sep}/${procNumber}` )
                   .then( ( response: { data: Process } ) => response.data );
    }
}
