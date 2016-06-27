import angular from 'angular';
import 'angular-ui-router';

import loginComponent from './login.component.js';
import loginShared from './shared/index.js';

const dependencies = [
    'ui.router', loginShared.name
];

export default angular.module( 'login.component', dependencies )
                      .directive( 'login', loginComponent )
                      .config( [
                          '$stateProvider', ( $stateProvider ) => {
                              $stateProvider
                                  .state( 'login', {
                                      url: '/login',
                                      nativeTransitions: {
                                          'type': 'fade'
                                      },
                                      template: '<login></login>'
                                  } );
                          }
                      ] );

