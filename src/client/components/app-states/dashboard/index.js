import 'angular-ui-router';
import './dashboard.css!css';
import angular from 'angular';
import DashBoardController from './dashboard.controller.js';
import dashBoardRoutes from './dashboard.routes.js';
import calendarState from '../calendar/index';
import noticiaDestaqueState from '../noticia/destaque/index.js';

const dependencies = [
    'ui.router', calendarState.name, noticiaDestaqueState.name
];

export default angular.module( 'dashBoard-state', dependencies )
                      .controller( 'dashBoardController', DashBoardController )
                      .config( dashBoardRoutes );




