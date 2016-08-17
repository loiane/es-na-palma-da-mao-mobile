import { CbmesApiService } from './cbmes-api.service';

export default angular.module( 'cbmes.shared', [] )
                      .service( 'CbmesApiService', CbmesApiService );

export * from './cbmes-api.service';
export * from './models/index';
