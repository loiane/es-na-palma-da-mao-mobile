// packages
import 'jquery';
import 'ionic';
import 'angular-material';
import routesConfig from './app.routes.mobile.js';
import appConfig from './app.config.mobile.js';
import appRun from './app.run.mobile.js';
import MenuController from './menu.controller.js';
import storageState from '../app-states/storage/index.js';
import principalState from '../app-states/principal/index.js';
import toastComponent from '../app-core-shared/toast/index.js';
import dialogComponent from '../app-core-shared/dialog/index.js';

let dependencies = [
    'ionic',
    'ngMaterial',
    toastComponent.name,
    dialogComponent.name,
    principalState.name,
    storageState.name
];

let app = angular.module( 'app', dependencies )
                 .config( appConfig )
                 .config( routesConfig )
                 .controller( 'menuController', MenuController )
                 .run( appRun );

// bootstrap app
angular.element( document ).ready( function() {
    angular.bootstrap( document, [ app.name ], {
        strictDi: true
    } );
} );
