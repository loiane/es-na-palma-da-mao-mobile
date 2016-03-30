import angular from 'angular';
import ocLazyLoad from 'oclazyload';
import ComponentLoaderService from './component-loader.service';
import SystemService from './system.service';
import DirectiveLoader from './directive-loader.directive.js';

export default angular.module( 'loader', [ ocLazyLoad ] )
                      .service( 'componentLoader', ComponentLoaderService )
                      .service( 'system', SystemService )
                      .directive( 'pdcDirectiveLoader', DirectiveLoader );
