import angular from 'angular';
import ocLazyLoad from 'oclazyload';
import ComponentLoaderService from './component-loader.service';
import SystemService from './system.service';

export default angular.module( 'loader', [ocLazyLoad] )
                      .service( 'componentLoader', ComponentLoaderService )
                      .service( 'system', SystemService );

