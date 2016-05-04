import './login.css!css';
import angular from 'angular';
import LoginController from './login.controller';
import loginRoutes from './login.routes';

export default angular.module( 'login-state', [] )
                      .controller( 'loginController', LoginController )
                      .config( loginRoutes );
