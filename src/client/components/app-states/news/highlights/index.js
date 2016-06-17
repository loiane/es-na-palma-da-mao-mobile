import 'angular-ui-router';
import './highlights.css!css';
import angular from 'angular';
import HighlightsController from './highlights.controller.js';
import highlightsRoutes from './highlights.routes.js';
import appConfig from '../../../app-core/app.config.js';

const dependencies = [
    'ui.router', appConfig.name
];

export default angular.module( 'states-news-highlights', dependencies )
                      .controller( 'highlightsController', HighlightsController )
                      .config( highlightsRoutes );
