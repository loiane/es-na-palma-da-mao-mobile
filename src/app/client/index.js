/* global $compile */
/* global angular:false, System:false */
import 'jquery'
import angular from 'angular/angular';
import 'angular-ui-router';
import 'ui-router-extras';
import ocLazyLoad from 'oclazyload';
import RouterHelperProvider from './components/config/router-helper.provider';
import routesConfig from './app.routes';
import AppController from './app.controller';
import loggerModule from './components/logger/index';
import loaderModule from './components/loader/index';
import appRun from './app.run';

import updateTitleDirective from './components/directives/update-title.directive';

System.import('bootstrap/css/bootstrap.css!').then(() => {
    System.import('src/app/client/app-bootstrap-overrides.css!');
    System.import('src/app/client/app.css!');
});

let layoutModule = angular.module('layout', []);

const dependencies = [
    ocLazyLoad,
    layoutModule.name,
    loaderModule.name,
    loggerModule.name,
    'ui.router', 
    'ct.ui.router.extras',
    'ct.ui.router.extras.future'
];

let app = angular.module('app', dependencies)
                .provider('routerHelper', RouterHelperProvider)
                .directive('updateTitle',updateTitleDirective)
                .config(routesConfig)
                .controller('AppController', AppController)
                .run(appRun);

 
// bootstrap app
angular.element(document).ready(function () {
    angular.bootstrap(document, [app.name], {
        strictDi: true
    });
});

export default app; 