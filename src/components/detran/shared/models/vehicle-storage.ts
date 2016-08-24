import { Vehicle } from './vehicle';

export interface VehicleStorage {
    removeVehicle( vehicle: Vehicle ): Vehicle[];
    addVehicle( vehicle: Vehicle ): Vehicle[];
    existsVehicle( vehicle: Vehicle ): boolean;
    vehicles: Vehicle[];
}