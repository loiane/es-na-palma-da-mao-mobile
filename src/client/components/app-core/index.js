// packages
import 'jquery';
import angular from 'angular/angular';
import 'angular-ui-router';
import 'ui-router-extras';
import ocLazyLoad from 'oclazyload';
import RouterHelperProvider from './config/router-helper.provider';
import loggerModule from './logger/index';
import loaderModule from './loader/index';
import routesConfig from './app.routes';
import AppController from './app.controller';
import appRun from './app.run';
import updateTitleDirective from '../directives/update-title.directive'; //eslint-disable-line
                                                                         // no-unused-vars
//eslint-disable-line
// no-unused-vars
let layoutModule = angular.module( 'layout', [] );

const dependencies = [
    ocLazyLoad,
    layoutModule.name,
    loaderModule.name,
    loggerModule.name,
    'ui.router',
    'ct.ui.router.extras',
    'ct.ui.router.extras.future'
];

let app = angular.module( 'app', dependencies )
                 .provider( 'routerHelper', RouterHelperProvider )
                 .directive( 'updateTitle', updateTitleDirective )
                 .config( routesConfig )
                 .controller( 'appController', AppController )
                 .run( appRun );

// bootstrap app
angular.element( document ).ready( function() {
    angular.bootstrap( document, [ app.name ], {
        strictDi: true
    } );
} );

export default app;
