import { IScope } from 'angular';
import { Vehicle, DriverLicense, DriverLicenseStorage, VehicleStorage } from './models/index';
import { AcessoCidadaoService } from '../../shared/authentication/index';

/**
 * Serviço que trata local storage no contexto do detran
 * 
 * @export
 * @class DetranStorage
 * @implements {DriverLicenseStorage}
 * @implements {VehicleStorage}
 */
export class DetranStorage implements DriverLicenseStorage, VehicleStorage {

    public static $inject: string[] = [ '$localStorage', 'acessoCidadaoService' ];

    /**
     * Creates an instance of DetranStorage.
     * 
     * @param {*} $localStorage
     * @param {AcessoCidadaoService} acessoCidadaoService
     * 
     * @memberOf DetranStorage
     */
    constructor( private $localStorage: any,
                 private acessoCidadaoService: AcessoCidadaoService ) {
        this.vehicles = this.vehicles || [];
    }

    /**
     * 
     */
    private get vehiclesStorageKey() {
        return `user-${this.acessoCidadaoService.tokenClaims.sub}-vehicles`;  // sub é o id do usuário logado
    }


    /**
     * 
     * 
     * @returns {Vehicle[]}
     */
    public get vehicles(): Vehicle[] {
        this.$localStorage[ this.vehiclesStorageKey ] = this.$localStorage[ this.vehiclesStorageKey ] || [];
        return this.$localStorage[ this.vehiclesStorageKey ] as Vehicle[];
    }

    /**
     * 
     */
    public set vehicles( vehicles: Vehicle[] ) {
        this.$localStorage[ this.vehiclesStorageKey ] = vehicles;
    }

    /**
     * 
     * 
     * @param {Vehicle} vehicle
     * @returns {boolean}
     */
    public existsVehicle( vehicle: Vehicle ): boolean {
        const existsPlaca = this.vehicles
            .map( v => v.plate.toUpperCase() )
            .indexOf( vehicle.plate );

        const existsRENAVAM = this.vehicles
            .map( v => v.renavam.toUpperCase() )
            .indexOf( vehicle.renavam );

        return existsPlaca !== -1 || existsRENAVAM !== -1;
    }


    /**
     * 
     * 
     * @param {Vehicle} vehicle
     */
    public removeVehicle( vehicle: Vehicle ): Vehicle[] {
        this.vehicles = this.vehicles.filter(( v1: Vehicle ) => {
            return v1.plate !== vehicle.plate && v1.renavam !== vehicle.renavam;
        });

        return this.vehicles;
    }

    /**
     * 
     * 
     * @param {Vehicle} vehicle
     * @returns {Vehicle[]}
     */
    public addVehicle( vehicle: Vehicle ): Vehicle[] {
        if ( !this.existsVehicle( vehicle ) ) {
            vehicle.plate = vehicle.plate.toUpperCase();
            vehicle.renavam = vehicle.renavam.toUpperCase();

            this.vehicles.push( vehicle );
        }
        return this.vehicles;
    }



    /******** DriverLicense *******************/
    /**
     * 
     * 
     * @readonly
     * @type {DriverLicense}
     */
    public get driverLicense(): DriverLicense {
        if ( this.hasDriverLicense ) {
            return {
                registerNumber: this.$localStorage.userClaims.cnhNumero,
                ballot: this.$localStorage.userClaims.cnhCedula
            };
        }
        return undefined;
    }

    /**
     * 
     */
    public set driverLicense( driverLicense: DriverLicense ) {
        this.$localStorage.userClaims.cnhNumero = driverLicense.registerNumber;
        this.$localStorage.userClaims.cnhCedula = driverLicense.ballot;
    }


    /**
     * 
     * 
     * @readonly
     * @type {boolean}
     */
    public get hasDriverLicense(): boolean {
        return angular.isDefined( this.$localStorage.userClaims.cnhNumero ) &&
            angular.isDefined( this.$localStorage.userClaims.cnhCedula );
    }
}
