import 'angular-ui-router';
import './dashboard.css!css';
import angular from 'angular';
import DashBoardController from './dashboard.controller.js';
import dashBoardRoutes from './dashboard.routes.js';
import agenda from '../agenda/index.js';
import noticiaDestaque from '../noticia/destaque/index.js';

const dependencies = [
    'ui.router',
    agenda.name,
    noticiaDestaque.name
];

export default angular.module( 'dashBoard-state', dependencies )
                      .controller( 'dashBoardController', DashBoardController )
                      .config( dashBoardRoutes );




