import { IHttpService, IPromise } from 'angular';
import { BusLine, BusRoute, BusSchedule } from './models/index';

/**
 * 
 * 
 * @export
 * @class CeturbApiService
 */
export class CeturbApiService {

    public static $inject: string[] = [ '$http', 'settings' ];

    /**
     * Creates an instance of CeturbApiService.
     * 
     * @param {Http} http
     * @param {Settings} settings
     */
    constructor(private http: Http, private settings: Settings) {
    }

    /**
     * 
     * 
     * @param {string} filter
     * @returns {IPromise<BusLine[]>}
     */
    public getLines(): IPromise<BusLine[]> {
        return this.http
            .get(`${this.settings.api.ceturb}/lines/`)
            .then( ( response: { data: BusLine[] } ) => response.data );
    }

    /**
     * 
     * 
     * @param {string} id
     * @returns {IPromise<BusSchedule>}
     */
    public getSchecule(id: string): IPromise<BusSchedule> {
        return this.http
            .get(`${this.settings.api.ceturb}/schedule/${id || ''}`)
            .then( ( response: { data: BusSchedule } ) => response.data );
    }

    /**
     * 
     * 
     * @param {string} id
     * @returns {IPromise<BusRoute>}
     */
    public getRoute(id: string): IPromise<BusRoute> {
        return this.http
            .get(`${this.settings.api.ceturb}/route/${id || ''}`)
            .then( ( response: { data: BusRoute } ) => response.data );
    }
}