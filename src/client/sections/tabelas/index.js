import 'angular-ui-router';
import './tabelas.css!';
import angular from 'angular';
import TabelasController from './tabelas.controller';
import tabelasRoutes from './tabelas.routes';

const dependencies = [
    'ui.router'
];

export default angular.module('app', dependencies)
                      .controller('TabelasController', TabelasController)
                      .config(tabelasRoutes);


  
     