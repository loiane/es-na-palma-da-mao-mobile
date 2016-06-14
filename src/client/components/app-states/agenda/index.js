import 'angular-ui-router';
import './agenda.css!';
import angular from 'angular';
import AgendaController from './agenda.controller.js';
import agendaRoutes from './agenda.routes.js';

const dependencies = [
    'ui.router'
];


export default angular.module( 'agenda-state', dependencies )
                      .controller( 'agendaController', AgendaController )
                      .config( agendaRoutes );
