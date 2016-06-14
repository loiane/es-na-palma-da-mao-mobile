import 'angular-ui-router';
import './dashboard.css!css';
import angular from 'angular';
import DashBoardController from './dashboard.controller';
import dashBoardRoutes from './dashboard.routes';
import agenda from '../agenda/index';
import noticia from '../noticia/index';

const dependencies = [
    'ui.router',
    agenda.name,
    noticia.name
];

export default angular.module( 'dashBoard-state', dependencies )
                      .controller( 'dashBoardController', DashBoardController )
                      .config( dashBoardRoutes );




