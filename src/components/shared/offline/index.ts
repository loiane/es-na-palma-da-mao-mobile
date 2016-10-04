import { CacheListenerService } from './cache-listener.service';

export default angular.module( 'shared.offline', [] )
                      .service( 'cacheListenerService', CacheListenerService );

export * from './cache-listener.service';