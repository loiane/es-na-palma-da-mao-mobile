import angular from 'angular';
import 'angular-ui-router';
import 'calendar/css/calendar.css!';
import CalendarController from './calendar.controller.js';
import calendarRoutes from './calendar.routes.js';
import './calendar.css!';
import calendar from 'calendar';
import calendarApiService from './calendar-api.service.js';

const dependencies = [
    'ui.router', calendar
];

export default angular.module( 'states-calendar', dependencies )
                      .controller( 'calendarController', CalendarController )
                      .service( 'calendarApiService', calendarApiService )
                      .config( calendarRoutes );
