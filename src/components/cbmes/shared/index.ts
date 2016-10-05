import { CbmesApiService } from './cbmes-api.service';
import { WarningLevelService } from './warning-level.service';

export default angular.module( 'cbmes.shared', [] )
                      .service( 'cbmesApiService', CbmesApiService )
                      .service( 'warningLevelService', WarningLevelService );

export * from './cbmes-api.service';
export * from './warning-level.service';
export * from './models/index';
