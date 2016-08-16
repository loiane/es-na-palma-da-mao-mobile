import { DetranApiService } from './detran-api.service';
import { VehicleStorage } from './vehicle-storage.service';

export default angular.module( 'detran.shared', [] )
                      .service( 'detranApiService', DetranApiService )
                      .service( 'vehicleStorage', VehicleStorage );

export * from './detran-api.service';
export * from './models/index';
export * from './vehicle-storage.service';
