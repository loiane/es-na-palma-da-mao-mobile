import 'angular-ui-router';
import './dashboard.css!css';
import angular from 'angular';
import DashBoardController from './dashboard.controller';
import NoticiaController from './noticia.controller';
import AgendaController from './agenda.controller';
import dashBoardRoutes from './dashboard.routes';

const dependencies = [
    'ui.router'
];

export default angular.module( 'dashBoard-state', dependencies )
                      .controller( 'dashBoardController', DashBoardController )
                      .controller( 'noticiaController', NoticiaController )
                      .controller( 'agendaController', AgendaController )
                      .config( dashBoardRoutes );




