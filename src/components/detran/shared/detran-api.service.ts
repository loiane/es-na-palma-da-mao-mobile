import { IHttpService, IPromise } from 'angular';
import { DriverData, Charge, DriverLicenseProcess, Ticket, DriverStatus } from './models/index';


/** @class */
export class DetranApiService {

    public static $inject: string[] = [ '$http', 'settings' ];

    /**
     * @constructor
     * 
     * @param {IHttpService} $http - angular $http service
     * @param {any} settings - application settings
     */
    constructor( private $http: IHttpService,
                 private settings: any ) {
    }


    /**
     * 
     * 
     * @returns {IPromise<DriverData>}
     */
    public getDriverData(): IPromise<DriverData> {
        return this.$http
            .get( `${this.settings.api.detran}/driverData` )
            .then(( response: { data: DriverData }) => response.data );
    }

    /**
     * 
     * 
     * @returns {IPromise<Ticket[]>}
     */
    public getTickets(): IPromise<Ticket[]> {
        return this.$http
            .get( `${this.settings.api.detran}/tickets` )
            .then(( response: { data: Ticket[] }) => response.data );
    }


    /**
     * 
     * 
     * @returns {IPromise<Charge[]>}
     */
    public getAdministrativeCharges(): IPromise<Charge[]> {
        return this.$http
            .get( `${this.settings.api.detran}/administrativeCharges ` )
            .then(( response: { data: Charge[] }) => response.data );
    }

    /**
     * 
     * 
     * @returns {IPromise<DriverLicenseProcess[]>}
     */
    public getDriverLicenseProcess(): IPromise<DriverLicenseProcess[]> {
        return this.$http
            .get( `${this.settings.api.detran}/driverLicenseProcess ` )
            .then(( response: { data: DriverLicenseProcess[] }) => response.data );
    }
}
