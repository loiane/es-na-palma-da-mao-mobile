import angular from 'angular';
import { IServiceProvider } from 'angular';

import { PushService } from './push.service';
import pushConfig from './push.config';

export default angular.module( 'shared.push', [] )
                      .service( 'pushService', PushService )
                      .run( pushConfig );

export * from './push.service';
