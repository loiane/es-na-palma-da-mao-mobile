import { VehicleInfo } from './vehicleInfo';

export interface Vehicle {
    plate: string;
    renavam: string;
    info?: VehicleInfo;
}
