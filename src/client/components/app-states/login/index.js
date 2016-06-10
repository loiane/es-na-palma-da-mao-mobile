import 'jquery';

import './login.css!css';
import angular from 'angular';
import LoginController from './login.controller';
import CadastroController from './cadastro.controller';
import loginRoutes from './login.routes';
import appConfig from '../../app-core/app.config.js';
import validadorCpfCnpj from '../../app-core-tools/validators/index.js';

export default angular.module( 'login-state', [ appConfig.name, validadorCpfCnpj.name ] )
                      .controller( 'loginController', LoginController )
                      .controller( 'cadastroController', CadastroController )
                      .config( loginRoutes );
