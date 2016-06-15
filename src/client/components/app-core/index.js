// 3th party
import 'jquery';
import 'ionic'; // carrega angular e ui-router junto
import 'angular-material';

// tools
import toastComponent from '../app-core-tools/toast/index.js';
import dialogComponent from '../app-core-tools/dialog/index.js';
import cpfService from '../app-core-tools/cpf.service.js';

// mobile
import 'ionic-native-transitions';
import appConfig from './app.config.js';
import ionicConfig from './app.ionic.config.js';
import themeConfig from './app.theme.config.js';
import routesConfig from './app.routes.js';
import appRun from './app.run.js';
import MenuController from './menu.controller.js';
import storageState from '../app-states/storage/index.js';
import principalState from '../app-states/principal/index.js';
import dashboardState from '../app-states/dashboard/index.js';
import loginState from '../app-states/login/index.js';

import mobileProviders from '../providers/mobileProviders.js';
import httpInterceptorsConfig from './httpInterceptors.config.js';
import 'ngstorage';

let dependencies = [
    'ionic',
    'ngMaterial',
    'ngStorage',
    'ionic-native-transitions',
    appConfig.name,
    mobileProviders.name,
    toastComponent.name,
    dialogComponent.name,
    principalState.name,
    storageState.name,
    dashboardState.name,
    loginState.name
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







