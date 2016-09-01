import angular from 'angular';
import { PushService } from './push.service';
import { PushConfig } from './push.config';

export default angular.module( 'shared.push', [] )
                      .service( 'pushService', PushService )
                      .service( 'pushConfig', PushConfig );

export * from './push.service';
export * from './push.config';
export * from './models/index';
