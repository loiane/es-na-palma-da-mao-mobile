import 'angular-ui-router';
import './dashboard.css!';
import angular from 'angular';
import DashBoardController from './dashboard.controller';
import dashBoardRoutes from './dashboard.routes';

const dependencies = [
    'ui.router'
];

export default angular.module('app', dependencies)
                      .controller('DashBoardController', DashBoardController)
                      .config(dashBoardRoutes);


  
     