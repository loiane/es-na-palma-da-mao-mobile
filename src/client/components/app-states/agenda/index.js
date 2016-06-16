import angular from 'angular';
import 'angular-ui-router';
import 'calendar/css/calendar.css!';
import AgendaController from './agenda.controller.js';
import agendaRoutes from './agenda.routes.js';
import './agenda.css!';
import calendar from 'calendar';

const dependencies = [
    'ui.router', calendar
];

export default angular.module( 'states-agenda', dependencies )
                      .controller( 'agendaController', AgendaController )
                      .config( agendaRoutes );
