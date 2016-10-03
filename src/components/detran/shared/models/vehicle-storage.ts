import { Vehicle } from './vehicle';
import { VehicleData } from './vehicle-data';

export interface VehicleStorage {
    removeVehicle( vehicle: Vehicle ): VehicleData;
    addVehicle( vehicle: Vehicle ): VehicleData;
    existsVehicle( vehicle: Vehicle ): boolean;
    vehiclesData: VehicleData;
}
