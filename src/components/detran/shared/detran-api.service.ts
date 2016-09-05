import { IHttpService, IPromise } from 'angular';

import { ISettings } from '../../shared/settings/index';
import { DriverData, Charge, DriverLicenseProcess, Ticket, DriverStatus, Vehicle, DriverLicense, VehicleInfo } from './models/index';


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
     * @returns {IPromise<DriverData>}
     */
    public getDriverData(): IPromise<DriverData> {
        return this.$http
            .get( `${this.settings.api.detran}/driver` )
            .then( ( response: { data: DriverData } ) => response.data );
    }

    /**
     * 
     * @returns {IPromise<Ticket[]>}
     */
    public getDriverTickets(): IPromise<Ticket[]> {
        return this.$http
            .get( `${this.settings.api.detran}/driver/tickets` )
            .then( ( response: { data: Ticket[] } ) => response.data );
    }


    /**
     * 
     * @param {Vehicle} vehicle
     * @returns {IPromise<Ticket[]>}
     */
    public getVehicleTickets( vehicle: Vehicle ): IPromise<Ticket[]> {
        return this.$http
            .get( `${this.settings.api.detran}/vehicle/tickets`, { params: vehicle } )
            .then( ( response: { data: Ticket[] } ) => response.data );
    }

    /**
     * 
     * @param {Vehicle} vehicle
     * @returns {IPromise<VehicleInfo>}
     */
    public getVehicle( vehicle: Vehicle ): IPromise<VehicleInfo> {
        return this.$http
            .get( `${this.settings.api.detran}/vehicle`, { params: vehicle } )
            .then( ( response: { data: VehicleInfo } ) => response.data );
    }

    /**
     * 
     * @param {DriverLicense} license
     * @returns {IPromise<any>}
     */
    public saveLicense( license: DriverLicense ): IPromise<any> {
        return this.$http
            .post( `${this.settings.api.acessocidadao}/Perfil/SalvarCNH`, { numero: license.registerNumber, cedula: license.ballot } )
            .then( ( response: { data: any } ) => response.data );
    }
}
