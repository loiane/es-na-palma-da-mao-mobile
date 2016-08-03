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
    public getLines(filter: string): IPromise<BusLine[]> {
        return this.http
            .get(`${this.settings.api.ceturb}/lines/${filter || ''}`)
            .map(res => <BusLine[]>res.json());
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
            .map(res => <BusSchedule>res.json());
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
            .map(res => <BusRoute>res.json());
    }
}