
// 3th party
import 'jquery';
import 'angular/angular';
import 'angular-material';
import 'angular-ui-router';
import 'ui-router-extras';
import ocLazyLoad from 'oclazyload';

// shared (mobile and web)
import '../app-core-shared/app.shared.css!';
import themeConfig from '../app-core-shared/app.theme.config.js';

// web
import RouterHelperProvider from './config/router-helper.provider.js';
import loggerModule from './logger/index.js';
import loaderModule from './loader/index.js';
import routesConfig from './app.routes.js';
import AppController from './app.controller.js';
import appRun from './app.run.js';
import updateTitleDirective from '../directives/update-title.directive.js'; //eslint-disable-line

let layoutModule = angular.module( 'layout', [] );

const dependencies = [
    ocLazyLoad,
    layoutModule.name,
    loaderModule.name,
    loggerModule.name,
    'ngMaterial',
    'ui.router',
    'ct.ui.router.extras',
    'ct.ui.router.extras.future'
];

let app = angular.module( 'app', dependencies )
                 .provider( 'routerHelper', RouterHelperProvider )
                 .directive( 'updateTitle', updateTitleDirective )
                 .config( routesConfig )
                 .config( themeConfig )
                 .controller( 'appController', AppController )
                 .run( appRun );

// bootstrap app
angular.element( document ).ready( function() {
    angular.bootstrap( document, [ app.name ], {
        strictDi: true
    } );
} );

export default app;
