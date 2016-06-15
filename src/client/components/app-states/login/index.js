import 'jquery';
import './login.css!css';
import angular from 'angular';

import LoginController from './login.controller.js';
import CadastroController from './cadastro.controller.js';
import loginRoutes from './login.routes.js';
import appConfig from '../../app-core/app.config.js';

export default angular.module( 'login-state', [ appConfig.name ] )
                      .controller( 'loginController', LoginController )
                      .controller( 'cadastroController', CadastroController )
                      .config( loginRoutes );
