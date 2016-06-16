import 'angular-ui-router';
import './dashboard.css!css';
import angular from 'angular';
import DashBoardController from './dashboard.controller';
import dashBoardRoutes from './dashboard.routes';
import calendarState from '../calendar/index';
import noticiaState from '../noticia/index';

const dependencies = [
    'ui.router', calendarState.name, noticiaState.name
];

export default angular.module( 'dashBoard-state', dependencies )
                      .controller( 'dashBoardController', DashBoardController )
                      .config( dashBoardRoutes );




