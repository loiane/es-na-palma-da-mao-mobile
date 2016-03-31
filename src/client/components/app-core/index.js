
// packages
import 'jquery';
import angular from 'angular/angular';
import 'angular-ui-router';
import 'ui-router-extras';
import fontAwsome from 'font-awesome'; //eslint-disable-line no-unused-vars
import ocLazyLoad from 'oclazyload';
import angularBootstrap from 'angular-bootstrap';

// app
import RouterHelperProvider from './config/router-helper.provider';
import loggerModule from './logger/index';
import loaderModule from './loader/index';
import routesConfig from './app.routes';
import AppController from './app.controller';
import appRun from './app.run';
import updateTitleDirective from '../directives/update-title.directive';

System.import( 'bootstrap/css/bootstrap.css!' ).then( () => {
    System.import( '.dist/components/app-core/app-bootstrap-overrides.css!' );
    System.import( '.dist/components/app-core/app.css!' );
} );

let layoutModule = angular.module( 'layout', [] );

const dependencies = [
    ocLazyLoad,
    layoutModule.name,
    loaderModule.name,
    loggerModule.name,
    angularBootstrap,
    'ui.router',
    'ct.ui.router.extras',
    'ct.ui.router.extras.future'
];

let app = angular.module( 'app', dependencies )
                 .provider( 'routerHelper', RouterHelperProvider )
                 .directive( 'updateTitle', updateTitleDirective )
                 .config( routesConfig )
                 .controller( 'appController', AppController )
                 .run( appRun );


// bootstrap app
angular.element( document ).ready( function() {
    angular.bootstrap( document, [ app.name ], {
        strictDi: true
    } );
} );

export default app;
