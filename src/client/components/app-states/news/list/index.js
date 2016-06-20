import 'angular-ui-router';
import './list.css!css';
import angular from 'angular';
import ListController from './list.controller.js';
import listRoutes from './list.routes.js';
import newsApiService from '../news-api.service.js';

const dependencies = [
    'ui.router'
];

export default angular.module( 'state-news-list', dependencies )
                      .controller( 'listController', ListController )
                      .service( 'newsApiService', newsApiService )
                      .config( listRoutes );
