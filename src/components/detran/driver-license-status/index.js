import angular from 'angular';
import 'angular-ui-router';

import licenseStatusComponent from './driver-license-status.component.js';
import detranShared from '../shared/index.js';

const dependencies = [
    'ui.router', detranShared.name
];

export default angular.module( 'driver-license-status.component', dependencies )
                      .directive( 'driverLicenseStatus', licenseStatusComponent )
                      .config( [
                          '$stateProvider', ( $stateProvider ) => {
                              $stateProvider
                                  .state( 'app.driverLicenseStatus', {
                                      url: 'driverLicenseStatus',
                                      data: { title: 'Situação CNH' },
                                      nativeTransitions: {
                                          'type': 'fade'
                                      },
                                      views: {
                                          content: {
                                              template: '<driver-license-status></driver-license-status>'
                                          }
                                      }
                                  } );
                          }
                      ] );
