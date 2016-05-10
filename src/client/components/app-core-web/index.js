// 3th party
import 'jquery';
import 'angular/angular';
import 'angular-material';
import 'angular-ui-router';
import 'ui-router-extras';
import ocLazyLoad from 'oclazyload';

import loaderModule from './loader/index.js';
import routesConfig from './app.routes.js';
import AppController from './app.controller.js';
import appRun from './app.run.js';
import updateTitleDirective from '../directives/update-title.directive.js';

// shared (mobile and web)
import '../app-core-shared/app.shared.css!';
import themeConfig from '../app-core-shared/app.theme.config.js';
import toastComponent from '../app-core-shared/toast/index.js';
import dialogComponent from '../app-core-shared/dialog/index.js';

// web
import RouterHelperProvider from '../app-core-web/config/router-helper.provider.js';


// eslint-disable-next-line angular/module-setter
let layoutModule = angular.module( 'layout', [] );

const dependencies = [
    ocLazyLoad,
    layoutModule.name,
    loaderModule.name,
    toastComponent.name,
    dialogComponent.name,
    'ngMaterial',
    'ui.router',
    'ct.ui.router.extras',
    'ct.ui.router.extras.future'
];

// eslint-disable-next-line angular/module-setter
let app = angular.module( 'app', dependencies )
                 .provider( 'routerHelper', RouterHelperProvider )
                 .directive( 'updateTitle', updateTitleDirective )
                 .config( routesConfig )
                 .config( themeConfig )
                 .controller( 'appController', AppController )
                 .run( appRun );

// bootstrap app
angular.element( document ).ready( function() {
    angular.bootstrap( document, [ app.name ], {
        strictDi: true
    } );
} );

export default app;
