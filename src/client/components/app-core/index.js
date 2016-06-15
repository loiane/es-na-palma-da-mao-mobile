// 3th party
import 'jquery';
import 'ionic'; // carrega angular e ui-router junto
import 'angular-material';

// tools
import toastComponent from '../app-core-tools/toast/index.js';
import dialogComponent from '../app-core-tools/dialog/index.js';
import validadores from '../app-core-tools/validators/index.js';

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

import noticiaDestaqueState from '../app-states/noticia/destaque/index.js';
import noticiaDetalheState from '../app-states/noticia/detalhe/index.js';
import noticiaListaState from '../app-states/noticia/lista/index.js';

import mobileProviders from '../providers/mobileProviders.js';
import httpInterceptor from './http-interceptor.js';
import 'ngstorage';

let dependencies = [
    'ionic',
    'ngMaterial',
    'ngStorage',
    'ionic-native-transitions',
    appConfig.name,
    validadores.name,
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
                 .config( httpInterceptor )
                 .controller( 'menuController', MenuController )
                 .run( appRun );

// bootstrap app
angular.element( document ).ready( function() {
    angular.bootstrap( document, [ app.name ], {
        strictDi: true
    } );
} );







