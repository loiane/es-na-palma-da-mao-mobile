// packages
import 'jquery';
import 'ionic';
import 'angular-material';
import routesConfig from './app.routes.mobile.js';
import appConfig from './app.config.mobile.js';
import appRun from './app.run.mobile.js';
import MenuController from './menu.controller.js';
import storageModule from '../app-states/storage/index.js';

let app = angular.module( 'app', [ 'ionic', 'ngMaterial', storageModule.name ] )
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
