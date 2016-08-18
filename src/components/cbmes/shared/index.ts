import { CBMESApiService } from './cbmes-api.service';

export default angular.module( 'cbmes.shared', [] )
                      .service( 'CBMESApiService', CBMESApiService );

export * from './cbmes-api.service';
export * from './models/index';
