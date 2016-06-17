import 'angular-ui-router';
import './dashboard.css!css';
import angular from 'angular';
import DashBoardController from './dashboard.controller.js';
import dashBoardRoutes from './dashboard.routes.js';
import calendarState from '../calendar/index';
import newsHighlightsState from '../news/highlights/index.js';

const dependencies = [
    'ui.router', calendarState.name, newsHighlightsState.name
];

export default angular.module( 'states-dashboard', dependencies )
                      .controller( 'dashBoardController', DashBoardController )
                      .config( dashBoardRoutes );




