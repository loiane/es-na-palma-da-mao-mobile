import { IHttpService, IPromise } from 'angular';
import { ISettings } from '../../shared/settings/index';
import { Warning } from './models/index';

export class CbmesApiService {

    public static $inject: string[] = [ '$http', 'settings' ];


    /**
     * Creates an instance of CbmesApiService.
     * 
     * @param {IHttpService} $http
     * @param {ISettings} settings
     */
    constructor( private $http: IHttpService, private settings: ISettings ) {
    }


    /**
     * 
     * 
     * @returns {IPromise<Warning[]>}
     */
    public getLastWarnings(): IPromise<Warning[]> {
       let today = new Date();
       today.setDate(today.getDate() - 7);

        return this.$http.get( this.settings.api.cbmes, today)
            .then(( response: { data: Warning[] }) => {
                return response.data;
            });
    }
}
