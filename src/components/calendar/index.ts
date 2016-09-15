import angular from 'angular';
import 'angular-ui-router';
import rcalendar from 'calendar';
import 'calendar/css/calendar.css!';

import calendarComponent from './calendar.component';
import calendarShared from './shared/index';

const dependencies = [
    'ui.router', rcalendar, calendarShared.name
];

export default angular.module( 'calendar.component', dependencies )
                      .directive( 'espmCalendar', calendarComponent )
                      .config( [
                          '$stateProvider', ( $stateProvider ) => {
                              $stateProvider
                                  .state( 'app.calendar', {
                                      url: 'agenda',
                                      data: { title: 'Agenda ES' },
                                      views: {
                                          content: {
                                              template: '<espm-calendar></espm-calendar>'
                                          }
                                      }
                                  } )
                                  .state( 'app.dashboard.calendar', {
                                      url: 'agenda',
                                      data: { title: 'AGENDA ES' },
                                      nativeTransitions: undefined,
                                      views: {
                                          'tab-calendar': {
                                              template: '<espm-calendar></espm-calendar>'
                                          }
                                      }
                                  } );
                          }
                      ] );

