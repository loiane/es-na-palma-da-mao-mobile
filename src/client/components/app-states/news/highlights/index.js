import 'angular-ui-router';
import './highlights.css!css';
import angular from 'angular';
import HighlightsController from './highlights.controller.js';
import highlightsRoutes from './highlights.routes.js';
import newsApiService from '../news-api.service.js';

const dependencies = [
    'ui.router'
];

export default angular.module( 'states-news-highlights', dependencies )
                      .controller( 'highlightsController', HighlightsController )
                      .service( 'newsApiService', newsApiService )
                      .config( highlightsRoutes );
