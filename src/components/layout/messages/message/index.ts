import angular from 'angular';
import MessageComponent from './message.component';

export default angular.module( 'message.component', [] )
                      .directive( 'message', MessageComponent ) ;
