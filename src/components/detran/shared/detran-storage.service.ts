import { Vehicle, DriverLicense, DriverLicenseStorage, VehicleStorage } from './models/index';
import { AcessoCidadaoService } from '../../shared/authentication/index';

export class DetranStorage implements DriverLicenseStorage, VehicleStorage {

    public static $inject: string[] = [ '$localStorage', 'acessoCidadaoService' ];
    private userStorageKey: string;

    /**
     * Creates an instance of DetranStorage.
     * 
     * @param {*} $localStorage
     * @param {AcessoCidadaoService} acessoCidadaoService
     */
    constructor( private $localStorage: any,
                 private acessoCidadaoService: AcessoCidadaoService ) {
        this.vehicles = this.vehicles || [];
    }


    /**
     * 
     */
    private refreshStorageKey() {
        this.userStorageKey = `user-${this.acessoCidadaoService.tokenClaims.sub}-vehicles`; // sub é o id do usuário logado
    }


    /**
     * 
     * 
     * @returns {Vehicle[]}
     */
    public get vehicles(): Vehicle[] {
        this.refreshStorageKey();
        return this.$localStorage[ this.userStorageKey ] as Vehicle[];
    }

    /**
     * 
     */
    public set vehicles( vehicles: Vehicle[] ) {
        this.refreshStorageKey();
        this.$localStorage[ this.userStorageKey ] = vehicles;
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
        } );

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
        return this.$localStorage.driverLicense as DriverLicense;
    }


    /**
     * 
     * 
     * @type {void}
     */
    public set driverLicense( driverLicense: DriverLicense ) {
        this.$localStorage.driverLicense = driverLicense;
    }

    /**
     * 
     * 
     * @readonly
     * @type {boolean}
     */
    public get hasDriverLicense(): boolean {
        return angular.isDefined( this.driverLicense );
    }
}
