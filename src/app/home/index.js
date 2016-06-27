import angular from 'angular';
import 'angular-ui-router';

import HomeComponent from './home.component.js';

const dependencies = [
    'ui.router'
];

export default angular.module( 'home.component', dependencies )
                      .directive( 'home', HomeComponent )
                      .config( [
                          '$stateProvider', ( $stateProvider ) => {
                              $stateProvider
                                  .state( 'home', {
                                      url: '/home',
                                      nativeTransitions: {
                                          'type': 'fade'
                                      },
                                      template: '<home></home>'
                                  } );
                          }
                      ] );
