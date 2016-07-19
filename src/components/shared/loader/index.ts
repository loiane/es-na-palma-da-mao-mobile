import * as angular from 'angular';
import 'oclazyload';
import ComponentLoaderService from './component-loader.service';
import SystemService from './system.service';

export default angular.module( 'loader', [ 'oc.lazyLoad' ] )
                      .service( 'componentLoader', ComponentLoaderService )
                      .service( 'system', SystemService );

