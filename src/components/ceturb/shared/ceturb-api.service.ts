import { IHttpService, IPromise } from 'angular';
import { ISettings } from '../../shared/settings/index';
import { BusLine, BusRoute, BusSchedule, FavoriteLinesData, CeturbStorage } from './index';

/**
 * 
 * 
 * @export
 * @class CeturbApiService
 */
export class CeturbApiService {

    public static $inject: string[] = [ '$http', 'settings', 'ceturbStorage' ];

    /**
     * Creates an instance of CeturbApiService.
     * 
     * @param {IHttpService} http
     * @param {ISettings} settings
     * @param {CeturbStorage} ceturbStorage
     * 
     * @memberOf CeturbApiService
     */
    constructor( private http: IHttpService, private settings: ISettings, private ceturbStorage: CeturbStorage ) {
    }

    /**
     * 
     * 
     * @param {string} filter
     * @returns {IPromise<BusLine[]>}
     */
    public getLines(): IPromise<BusLine[]> {
        return this.http
            .get( `${this.settings.api.ceturb}/lines/` )
            .then( ( response: { data: BusLine[] } ) => response.data );
    }

    /**
     * 
     * 
     * @param {string} id
     * @returns {IPromise<BusSchedule>}
     */
    public getSchedule( id: string = '' ): IPromise<BusSchedule> {
        return this.http
            .get( `${this.settings.api.ceturb}/schedule/${id}` )
            .then( ( response: { data: BusSchedule } ) => response.data );
    }

    /**
     * 
     * 
     * @param {string} id
     * @returns {IPromise<BusRoute>}
     */
    public getRoute( id: string = '' ): IPromise<BusRoute> {
        return this.http
            .get( `${this.settings.api.ceturb}/route/${id}` )
            .then( ( response: { data: BusRoute } ) => response.data );
    }

    /**
     * 
     * 
     * @param {boolean} [hasNewData=false]
     * @returns {IPromise<FavoriteLinesData>}
     * 
     * @memberOf CeturbApiService
     */
    public syncFavoriteLinesData( hasNewData: boolean = false ): IPromise<FavoriteLinesData> {
        if ( hasNewData ) {
            this.ceturbStorage.favoriteLines.date = new Date();
        }
        return this.http
            .post( `${this.settings.api.espm}/data/favoriteBusLines`, this.ceturbStorage.favoriteLines )
            .then(( response: { data: FavoriteLinesData }) => {
                this.ceturbStorage.favoriteLines = response.data;
                return response.data;
            })
            .catch(( error ) => {
                if ( this.ceturbStorage.hasFavoriteLines ) {
                    return this.ceturbStorage.favoriteLines;
                }
                throw error;
            });
    }
}
