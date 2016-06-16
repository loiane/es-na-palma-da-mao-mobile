import 'angular-ui-router';
import './destaque.css!css';
import angular from 'angular';
import DestaqueController from './destaque.controller.js';
import destaqueRoutes from './destaque.routes.js';
import appConfig from '../../../app-core/app.config.js';

const dependencies = [
    'ui.router',
    appConfig.name
];

export default angular.module( 'state-noticia-destaque', dependencies )
                      .controller( 'destaqueController', DestaqueController )
                      .config( destaqueRoutes );
