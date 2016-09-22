// 3th party
import 'ionic'; // carrega angular e ui-router junto
import 'ionic-native';
import 'angular-i18n/pt-br';   // on pt-br you can use your locale
import 'angular-material';
import 'ionic-native-transitions';
import 'ngstorage';
import 'angular-ui-router';
import 'ui-router-extras';
import 'oclazyload';

import 'font-awesome';
import 'roboto/css/roboto/roboto-fontface.css!';

// shared
import shared from '../shared/index';
import layout from '../layout/index';

// Features
import appComponent from './app.component';

let dependencies = [
    'ionic',
    'ionic.native',
    'ngMaterial',
    'ngStorage',
    'ngAnimate',
    'ionic-native-transitions',
    'ui.router',
    'ct.ui.router.extras',
    'ct.ui.router.extras.future',
    'oc.lazyLoad',
    shared.name,
    layout.name
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
