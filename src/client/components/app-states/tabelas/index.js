import 'angular-ui-router';
import './tabelas.css!';
import angular from 'angular';
import TabelasController from './tabelas.controller';
import tabelasRoutes from './tabelas.routes';

const dependencies = [
    'ui.router'
];

export default angular.module( 'tabelas-state', dependencies )
                      .controller( 'tabelasController', TabelasController )
                      .config( tabelasRoutes );




