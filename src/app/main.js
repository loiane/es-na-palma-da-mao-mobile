// 3th party
import 'jquery';
import 'ionic'; // carrega angular e ui-router junto
import 'angular-i18n/pt-br';   // on pt-br you can use your locale
import 'angular-material';
import 'ionic-native-transitions';
import 'ngstorage';
import 'angular-ui-router';
import 'ui-router-extras';
import ocLazyLoad from 'oclazyload';

import 'app/app.component.css!';
import 'angular-material/angular-material.css!';
import 'font-awesome';
import 'robotoDraft/robotodraft.css!';

// shared
import shared from './shared/index.js';

// Features
import appComponent from './app.component.js';
/*import dashboard from './dashboard/index.js';
 import calendar from './calendar/index.js';*/
//import login from './login/index.js';
//import home from './home/index.js';
//import news from './news/index.js';

let dependencies = [
    'ionic',
    'ngMaterial',
    'ngStorage',
    'ionic-native-transitions',
    'ui.router',
    'ct.ui.router.extras',
    'ct.ui.router.extras.future',
    ocLazyLoad,
    shared.name
];

let app = angular.module( 'app', dependencies )
                 .directive( 'app', appComponent )
                 .config( [
                     '$stateProvider', ( $stateProvider ) => {
                         $stateProvider
                             .state( 'app', {
                                 url: '/app/',
                                 abstract: true,
                                 template: '<menu></menu>'
                             } );
                     }
                 ] );

/*
 * As we are using ES6 with Angular 1.x we can't use ng-app directive
 * to bootstrap the application as modules are loaded asynchronously.
 * Instead, we need to bootstrap the application manually
 */
angular.element( document ).ready( function() {
    angular.bootstrap( document, [ app.name ], {
        strictDi: true
    } );
} );







