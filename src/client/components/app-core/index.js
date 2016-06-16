// 3th party
import 'jquery';
import 'ionic'; // carrega angular e ui-router junto
import 'angular-material';
import 'ionic-native-transitions';
import 'ngstorage';

// Modules
import toastModule from '../app-core-tools/toast/index.js';
import dialogModule from '../app-core-tools/dialog/index.js';
import authenticationModule from '../app-core-tools/authentication/index.js';

// Services
import cpfService from '../app-core-tools/cpf.service.js';

// configs
import appConfig from './app.config.js';
import ionicConfig from './app.ionic.config.js';
import themeConfig from './app.theme.config.js';
import routesConfig from './app.routes.js';
import httpInterceptorsConfig from './httpInterceptors.config.js';

// Runs
import appRun from './app.run.js';  

// Controllers
import MenuController from './menu.controller.js';

// Providers

// states
import dashboardState from '../app-states/dashboard/index.js';
import loginState from '../app-states/login/sign-in/index.js';
import homeState from '../app-states/login/home/index.js';

import noticiaDetalheState from '../app-states/noticia/detalhe/index.js';
import noticiaListaState from '../app-states/noticia/lista/index.js';


let dependencies = [
    'ionic',
    'ngMaterial',
    'ngStorage',
    'ionic-native-transitions',
    appConfig.name,
    authenticationModule.name,
    toastModule.name,
    dialogModule.name,
    dashboardState.name,
    loginState.name,
    homeState.name,
    noticiaDetalheState.name,
    noticiaListaState.name
];

let app = angular.module( 'app', dependencies )
                 .config( ionicConfig )
                 .config( themeConfig )
                 .config( routesConfig )
                 .config( httpInterceptorsConfig )
                 .controller( 'menuController', MenuController )
                 .service( 'cpfService', cpfService )
                 .run( appRun );

// bootstrap app
angular.element( document ).ready( function() {
    angular.bootstrap( document, [ app.name ], {
        strictDi: true
    } );
} );







