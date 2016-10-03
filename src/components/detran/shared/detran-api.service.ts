import { IHttpService, IPromise } from 'angular';

import { ISettings } from '../../shared/settings/index';
import { DetranStorage } from './index';
import { DriverData, Ticket, Vehicle, DriverLicense, VehicleInfo, VehicleData } from './models/index';


export class DetranApiService {

    public static $inject: string[] = [ '$http', 'settings', 'detranStorage' ];

    /**
     * Creates an instance of DetranApiService.
     * 
     * @param {IHttpService} $http
     * @param {ISettings} settings
     * @param {DetranStorage} detranStorage
     * 
     * @memberOf DetranApiService
     */
    constructor( private $http: IHttpService,
        private settings: ISettings,
        private detranStorage: DetranStorage ) {
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
    public getVehicleInfo( vehicle: Vehicle ): IPromise<VehicleInfo> {
        return this.$http
            .get( `${this.settings.api.detran}/vehicle`, { params: vehicle } )
            .then( ( response: { data: VehicleInfo } ) => response.data );
    }

    /**
     * 
     * 
     * @param {boolean} [hasNewData=false]
     * @returns
     * 
     * @memberOf DetranApiService
     */
    public syncVehicleData( hasNewData: boolean = false ) {
        if (hasNewData) {
            this.detranStorage.vehiclesData.date = new Date();
        }
        return this.$http
            .post( `${this.settings.api.espm}/data/vehicles`, this.detranStorage.vehiclesData)
            .then(( response: { data: VehicleData }) => {
                this.detranStorage.vehiclesData = response.data;
                return response.data;
            })
            .catch(( error ) => {
                if ( this.detranStorage.existsVehicle ) {
                    return this.detranStorage.vehiclesData;
                }
                throw error;
            });
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
