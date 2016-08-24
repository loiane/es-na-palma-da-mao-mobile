import { Vehicle, DriverLicense, DriverLicenseStorage, VehicleStorage } from './models/index';

export class DetranStorage implements DriverLicenseStorage, VehicleStorage {

    public static $inject: string[] = ['$localStorage' ];

    /**
     * Creates an instance of VehicleStorageService.
     * 
     * @param {*} $localStorage
     */
    constructor( private $localStorage: any ) {
        this.$localStorage.vehicles = this.$localStorage.vehicles || [];
    }


    /**
     * 
     * 
     * @returns {Vehicle[]}
     */
    public get vehicles(): Vehicle[] {
        return this.$localStorage.vehicles as Vehicle[];
    }

    /**
     * 
     * 
     * @param {Vehicle} vehicle
     * @returns {boolean}
     */
    public existsVehicle( vehicle: Vehicle ): boolean {
        const existsPlaca = this.$localStorage.vehicles
                                              .map( v => v.plate.toUpperCase() )
                                              .indexOf( vehicle.plate );

        const existsRENAVAM = this.$localStorage.vehicles
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
        this.$localStorage.vehicles = this.vehicles.filter( ( v1: Vehicle ) => {
             return v1.plate !== vehicle.plate && v1.renavam !== vehicle.renavam;
        } );

        return this.$localStorage.vehicles;
    }

    /**
     * 
     * 
     * @param {Vehicle} vehicle
     * @returns {Vehicle[]}
     */
    public addVehicle( vehicle: Vehicle ): Vehicle[] {
        if  ( !this.existsVehicle( vehicle ) ) {
            vehicle.plate = vehicle.plate.toUpperCase();
            vehicle.renavam = vehicle.renavam.toUpperCase();

            this.$localStorage.vehicles.push( vehicle );
        }
        return this.$localStorage.vehicles;
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
