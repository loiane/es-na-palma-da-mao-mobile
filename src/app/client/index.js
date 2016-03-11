/* global $compile */
/* global angular:false, System:false */
import 'jquery'
import angular from 'angular/angular';
import 'angular-ui-router';
import 'ui-router-extras';
import ocLazyLoad from 'oclazyload';
import routingConfig from './components/config/routing';
import routesConfig from './app.routes';
import AppController from './app.controller';
import loader from './components/loader/index';
import appConfig from './app.config';


System.import('bootstrap/css/bootstrap.css!').then(() => {
    System.import('src/app/client/app-bootstrap-overrides.css!');
    System.import('src/app/client/app.css!');
});
 
let layout = angular.module('layout', []);
 
const dependencies = [
    ocLazyLoad,
    layout.name,
    loader.name,
    'ui.router',
    'ct.ui.router.extras',
    'ct.ui.router.extras.future'
];


let app = angular.module('app', dependencies)
    .run(appConfig)
    .config(routingConfig)
    .config(routesConfig)
    .controller('AppController', AppController);


// bootstrap app
angular.element(document).ready(function () {
    angular.bootstrap(document.body, [app.name], {
        //strictDi: true
    });
});

export default app; 