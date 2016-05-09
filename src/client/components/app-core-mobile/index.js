// 3th party
import 'jquery';
import 'ionic'; // carrega angular e ui-router junto
import 'angular-material';

// shared (mobile and web)
import '../app-core-shared/app.shared.css!';
import themeConfig from '../app-core-shared/app.theme.config.js';
import toastComponent from '../app-core-shared/toast/index.js';
import dialogComponent from '../app-core-shared/dialog/index.js';

// mobile
import routesConfig from './app.routes.js';
import ionicConfig from './app.ionic.config.js';
import appRun from './app.run.js';
import MenuController from './menu.controller.js';
import storageState from '../app-states/storage/index.js';
import principalState from '../app-states/principal/index.js';
import loginState from '../app-states/login/index.js';


let dependencies = [
    'ionic',
    'ngMaterial',
    toastComponent.name,
    dialogComponent.name,
    principalState.name,
    storageState.name,
    loginState.name
];

let app = angular.module( 'app', dependencies )
                 .config( ionicConfig )
                 .config( themeConfig )
                 .config( routesConfig )
                 .controller( 'menuController', MenuController )
                 .run( appRun );

// bootstrap app
angular.element( document ).ready( function() {
    angular.bootstrap( document, [ app.name ], {
        strictDi: true
    } );
} );







