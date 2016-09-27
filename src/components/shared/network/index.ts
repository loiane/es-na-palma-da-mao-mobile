import { NetworkService } from './network.service';

export default angular.module( 'shared.network', [] )
                      .service( 'networkService', NetworkService );

export * from './network.service';