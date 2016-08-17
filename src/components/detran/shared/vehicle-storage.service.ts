import { Vehicle } from './models/index';

export class VehicleStorage {

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
    public exists( vehicle: Vehicle ): boolean {
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
    public remove( vehicle: Vehicle ): Vehicle[] {
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
    public add( vehicle: Vehicle ): Vehicle[] {
        if  ( !this.exists( vehicle ) ) {
            vehicle.plate = vehicle.plate.toUpperCase();
            vehicle.renavam = vehicle.renavam.toUpperCase();

            this.$localStorage.vehicles.push( vehicle );
        }
        return this.$localStorage.vehicles;
    }
}
