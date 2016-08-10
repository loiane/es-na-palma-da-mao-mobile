import { DetranApiService } from './detran-api.service';

export default angular.module( 'detran.shared', [] )
                      .service( 'detranApiService', DetranApiService );

export * from './detran-api.service';
export * from './models/index';
