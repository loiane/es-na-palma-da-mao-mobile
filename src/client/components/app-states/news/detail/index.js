import 'angular-ui-router';
import './detalhe.css!css';
import angular from 'angular';
import DetalheController from './detalhe.controller.js';
import detalheRoutes from './detalhe.routes.js';
import appConfig from '../../../app-core/app.config.js';

const dependencies = [
    'ui.router',
    appConfig.name
];

export default angular.module( 'state-noticia-detalhe', dependencies )
                      .controller( 'detalheController', DetalheController )
                      .config( detalheRoutes );
