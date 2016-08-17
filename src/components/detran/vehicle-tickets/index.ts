import angular from 'angular';
import 'angular-ui-router';

import vehicleTicketsComponent from './vehicle-tickets.component';
import detranShared from '../shared/index';

const dependencies = [
    'ui.router', detranShared.name
];

export default angular.module( 'vehicle-tickets.component', dependencies )
                      .directive( 'detranVehicleTickets', vehicleTicketsComponent )
                      .config( [
                          '$stateProvider', ( $stateProvider ) => {
                              $stateProvider
                                  .state( 'app.vehicleTickets/:plate/:renavam', {
                                      url: 'detran/vehicle/tickets/:plate/:renavam',
                                      data: { title: 'Multas por Veículo' },
                                      nativeTransitions: {
                                          'type': 'fade'
                                      },
                                      views: {
                                          content: {
                                              template: '<detran-vehicle-tickets></detran-vehicle-tickets>'
                                          }
                                      }
                                  } );
                          }
                      ] );
