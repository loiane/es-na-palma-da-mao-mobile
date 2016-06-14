import 'angular-ui-router';
import './noticia.css!css';
import angular from 'angular';
import NoticiaController from './noticia.controller.js';
import noticiaRoutes from './noticia.routes.js';

const dependencies = [
    'ui.router'
];

export default angular.module( 'noticia-state', dependencies )
                      .controller( 'noticiaController', NoticiaController )
                      .config( noticiaRoutes );
