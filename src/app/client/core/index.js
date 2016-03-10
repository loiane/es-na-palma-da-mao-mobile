/* global angular:false, System:false */
import 'angular-ui-router';
import 'ui-router-extras';
import angular from 'angular';
import ocLazyLoad from 'oclazyload';
import appConfig from './config/app';
import routingConfig from './config/routing';
import routesConfig from './core-routes';
import CoreController from './core-controller';
//import constants from './config/constants.json!';
// import errorHandlingConfig from './config/error-handling';

System.import('bootstrap/css/bootstrap.css!').then(() => {
    System.import('src/app/client/core/css/core-bootstrap-overrides.css!');
    System.import('src/app/client/core/css/core.css!');
});

const dependencies = [
    ocLazyLoad,
    'ui.router',
    'ct.ui.router.extras', 
    'ct.ui.router.extras.future'
];

console.log(System.baseURL)

const app = angular.module('app', dependencies)
    .run(appConfig)
    .config(routingConfig)
    .config(routesConfig)
    .controller('CoreController', CoreController);
//    .config(defaultLocaleConfig)
//    .run(errorHandlingConfig);

// Object.keys(constants).forEach((constantName) => {
//     app.constant(constantName, constants[constantName]);
// });

export default app; 