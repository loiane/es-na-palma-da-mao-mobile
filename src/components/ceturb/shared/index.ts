import { CeturbApiService } from './ceturb-api.service';
import { CeturbStorage } from './ceturb-storage.service';

export default angular.module( 'ceturb.shared', [] )
                      .service( 'ceturbStorage', CeturbStorage )
                      .service( 'ceturbApiService', CeturbApiService );

export * from './ceturb-api.service';
export * from './models/index';
export * from './ceturb-storage.service';