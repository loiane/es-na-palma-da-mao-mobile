import app from './app/index';

/*
 * As we are using ES6 with Angular 1.x we can't use ng-app directive
 * to bootstrap the application as modules are loaded asynchronously.
 * Instead, we need to bootstrap the application manually
 */
angular.element( document ).ready( function () {
    angular.bootstrap( document, [app.name], {
        strictDi: true
    } );
} );







