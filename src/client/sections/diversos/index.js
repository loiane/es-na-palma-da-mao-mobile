import 'angular-ui-router';
import './diversos.css!';
import angular from 'angular';
import DiversosController from './diversos.controller';
import diversosRoutes from './diversos.routes';

const dependencies = [
    'ui.router'
];

export default angular.module('app', dependencies)
                      .controller('DiversosController', DiversosController)
                      .config(diversosRoutes);


  
     