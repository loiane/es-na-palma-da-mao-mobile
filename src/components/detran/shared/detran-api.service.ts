import { IHttpService, IPromise } from 'angular';

import { ISettings } from '../../shared/settings/index';
import { DriverData, Charge, DriverLicenseProcess, Ticket, DriverStatus } from './models/index';


export class DetranApiService {

    public static $inject: string[] = [ '$http', 'settings' ];

    /**
     * Creates an instance of DetranApiService.
     * 
     * @param {IHttpService} $http
     * @param {ISettings} settings
     */
    constructor( private $http: IHttpService,
                 private settings: ISettings ) {
    }


    /**
     * 
     * 
     * @returns {IPromise<DriverData>}
     */
    public getDriverData(): IPromise<DriverData> {
        return this.$http
            .get( `${this.settings.api.detran}/driverData` )
            .then(( response: { data: DriverData } ) => response.data );
    }

    /**
     * 
     * 
     * @returns {IPromise<Ticket[]>}
     */
    public getTickets(): IPromise<Ticket[]> {
        return this.$http
            .get( `${this.settings.api.detran}/tickets` )
            .then(( response: { data: Ticket[] } ) => response.data );
    }


    /**
     * 
     * 
     * @returns {IPromise<Charge[]>}
     */
    public getAdministrativeCharges(): IPromise<Charge[]> {
        return this.$http
            .get( `${this.settings.api.detran}/administrativeCharges ` )
            .then(( response: { data: Charge[] } ) => response.data );
    }

    /**
     * 
     * 
     * @returns {IPromise<DriverLicenseProcess[]>}
     */
    public getDriverLicenseProcess(): IPromise<DriverLicenseProcess[]> {
        return this.$http
            .get( `${this.settings.api.detran}/driverLicenseProcess ` )
            .then(( response: { data: DriverLicenseProcess[] } ) => response.data );
    }
}
