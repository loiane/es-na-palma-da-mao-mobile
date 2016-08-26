import angular from 'angular';
import { notifyingService } from './notifying-service';

export default angular.module( 'shared.notification', [] )
                      .factory( 'notifyingService', notifyingService );
