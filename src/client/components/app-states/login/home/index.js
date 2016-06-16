import 'jquery';
import './home.css!css';
import angular from 'angular';

import HomeController from './home.controller.js';
import homeRoutes from './home.routes.js';
import appConfig from '../../../app-core/app.config.js';

export default angular.module( 'state-home', [ appConfig.name ] )
                      .controller( 'homeController', HomeController )
                      .config( homeRoutes );
