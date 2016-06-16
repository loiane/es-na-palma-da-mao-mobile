import './principal.css!';
import PrincipalController from './principal.controller.js';
import principalRoutes from './principal.routes.js';

export default angular.module( 'principal-state', [] )
                      .controller( 'principalController', PrincipalController )
                      .config( principalRoutes );
