import 'jquery';
import './login.css!css';
import angular from 'angular';

import LoginController from './login.controller.js';
import loginRoutes from './login.routes.js';
import appConfig from '../../../app-core/app.config.js';

export default angular.module( 'state-login', [ appConfig.name ] )
                      .controller( 'loginController', LoginController )
                      .config( loginRoutes );
