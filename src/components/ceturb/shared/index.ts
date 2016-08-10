import { CeturbApiService } from './ceturb-api.service';

export default angular.module( 'ceturb.shared', [] )
                      .service( 'ceturbApiService', CeturbApiService );

export * from './ceturb-api.service';
export * from './models/index';