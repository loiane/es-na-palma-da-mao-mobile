// 3th party
//import 'jquery';
import 'ionic'; // carrega angular e ui-router junto
import 'angular-i18n/pt-br';   // on pt-br you can use your locale
import 'angular-material';
import 'ionic-native-transitions';
import 'ngstorage';
import 'angular-ui-router';
import 'ui-router-extras';
import ocLazyLoad from 'oclazyload';

import 'angular-material/angular-material.min.css!';
import 'font-awesome';
import 'robotoDraft/robotodraft.css!';

// shared
import shared from '../shared/index.js';

// Features
import appComponent from './app.component.js';

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

export default angular.module( 'app', dependencies )
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
