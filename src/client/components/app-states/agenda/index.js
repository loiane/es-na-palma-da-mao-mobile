import angular from 'angular';
import 'angular-ui-router';
import 'calendar/css/calendar.css!';
import AgendaController from './agenda.controller.js';
import agendaRoutes from './agenda.routes.js';
import './agenda.css!';
import calendar from 'calendar';
import eventosApiService from './eventos-api.service.js';
import agendasApiService from './agendas-api.service.js';

const dependencies = [
    'ui.router', calendar
];

export default angular.module( 'states-agenda', dependencies )
                      .controller( 'agendaController', AgendaController )
                      .service( 'eventosApiService', eventosApiService )
                      .service( 'agendasApiService', agendasApiService )
                      .config( agendaRoutes );
