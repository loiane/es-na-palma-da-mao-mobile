import { Vehicle, DriverLicense, DriverLicenseStorage, VehicleStorage, VehicleData } from './models/index';
import { AuthenticationService } from '../../shared/authentication/index';

/**
 * Serviço que trata local storage no contexto do detran
 * 
 * @export
 * @class DetranStorage
 * @implements {DriverLicenseStorage}
 * @implements {VehicleStorage}
 */
export class DetranStorage implements DriverLicenseStorage, VehicleStorage {

    public static $inject: string[] = [ '$localStorage', 'authenticationService' ];

    private vehiclesStorageKey: string = 'detranVehicles';

    /**
     * Creates an instance of DetranStorage.
     * 
     * @param {*} $localStorage
     * @param {AuthenticationService} authenticationService
     * 
     * @memberOf DetranStorage
     */
    constructor( private $localStorage: any,
        private authenticationService: AuthenticationService ) {
    }


    /**
     * 
     * 
     * @type {VehicleData}
     * @memberOf DetranStorage
     */
    public get vehiclesData(): VehicleData {
        this.$localStorage[ this.vehiclesStorageKey ] = this.$localStorage[ this.vehiclesStorageKey ] || { vehicles: [] };
        return this.$localStorage[ this.vehiclesStorageKey ] as VehicleData;
    }

    public set vehiclesData( vehicles: VehicleData ) {
        this.$localStorage[ this.vehiclesStorageKey ] = vehicles;
    }

    /**
     * 
     * 
     * @param {Vehicle} vehicle
     * @returns {boolean}
     */
    public existsVehicle( vehicle: Vehicle ): boolean {
        const existsPlaca = this.vehiclesData.vehicles
            .map( v => v.plate.toUpperCase() )
            .indexOf( vehicle.plate.toUpperCase() );

        const existsRENAVAM = this.vehiclesData.vehicles
            .map( v => v.renavam )
            .indexOf( vehicle.renavam );

        return existsPlaca !== -1 || existsRENAVAM !== -1;
    }

    /**
     * 
     * 
     * @param {Vehicle} vehicle
     * @returns {VehicleData}
     * 
     * @memberOf DetranStorage
     */
    public removeVehicle( vehicle: Vehicle ): VehicleData {
        this.vehiclesData.vehicles = this.vehiclesData.vehicles.filter(( v1: Vehicle ) => {
            return v1.plate !== vehicle.plate && v1.renavam !== vehicle.renavam;
        });

        return this.vehiclesData;
    }

    /**
     * 
     * 
     * @param {Vehicle} vehicle
     * @returns {VehicleData}
     * 
     * @memberOf DetranStorage
     */
    public addVehicle( vehicle: Vehicle ): VehicleData {
        if ( !this.existsVehicle( vehicle ) ) {
            vehicle.plate = vehicle.plate.toUpperCase();
            vehicle.renavam = vehicle.renavam;

            this.vehiclesData.vehicles.push( vehicle );
        }
        return this.vehiclesData;
    }

    /******** DriverLicense *******************/
    /**
     * 
     * 
     * @type {DriverLicense}
     * @memberOf DetranStorage
     */
    public get driverLicense(): DriverLicense {
        return {
            registerNumber: this.authenticationService.user.cnhNumero,
            ballot: this.authenticationService.user.cnhCedula
        };
    }

    /**
     * 
     * 
     * @readonly
     * @type {boolean}
     * @memberOf DetranStorage
     */
    public get isDriverLicenseValidNumber(): boolean {
        if ( isNaN( Number( this.driverLicense.registerNumber ) ) || isNaN( Number( this.driverLicense.ballot ) ) ) {
            return false;
        }
        return true;
    }

    /**
     * 
     * 
     * 
     * @memberOf DetranStorage
     */
    public set driverLicense( driverLicense: DriverLicense ) {
        this.authenticationService.user.cnhNumero = driverLicense.registerNumber;
        this.authenticationService.user.cnhCedula = driverLicense.ballot;
    }

    /**
     * 
     * 
     * @readonly
     * @type {boolean}
     * @memberOf DetranStorage
     */
    public get hasDriverLicense(): boolean {
        return !!this.driverLicense.registerNumber && !!this.driverLicense.ballot;
    }
}
