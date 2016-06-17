import 'angular-ui-router';
import './lista.css!css';
import angular from 'angular';
import ListaController from './lista.controller.js';
import listaRoutes from './lista.routes.js';
import appConfig from '../../../app-core/app.config.js';

const dependencies = [
    'ui.router',
    appConfig.name
];

export default angular.module( 'state-noticia-lista', dependencies )
                      .controller( 'listaController', ListaController )
                      .config( listaRoutes );
