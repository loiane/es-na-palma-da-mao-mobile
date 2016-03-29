'use strict';

System.register(['jquery', 'angular/angular', 'angular-ui-router', 'ui-router-extras', 'font-awesome', 'oclazyload', 'angular-bootstrap', './components/config/router-helper.provider', './app.routes', './app.controller', './components/logger/index', './components/loader/index', './app.run', './components/directives/update-title.directive'], function (_export, _context) {
    var angular, fontAwsome, ocLazyLoad, angularBootstrap, RouterHelperProvider, routesConfig, AppController, loggerModule, loaderModule, appRun, updateTitleDirective, layoutModule, dependencies, app;
    return {
        setters: [function (_jquery) {}, function (_angularAngular) {
            angular = _angularAngular.default;
        }, function (_angularUiRouter) {}, function (_uiRouterExtras) {}, function (_fontAwesome) {
            fontAwsome = _fontAwesome.default;
        }, function (_oclazyload) {
            ocLazyLoad = _oclazyload.default;
        }, function (_angularBootstrap) {
            angularBootstrap = _angularBootstrap.default;
        }, function (_componentsConfigRouterHelperProvider) {
            RouterHelperProvider = _componentsConfigRouterHelperProvider.default;
        }, function (_appRoutes) {
            routesConfig = _appRoutes.default;
        }, function (_appController) {
            AppController = _appController.default;
        }, function (_componentsLoggerIndex) {
            loggerModule = _componentsLoggerIndex.default;
        }, function (_componentsLoaderIndex) {
            loaderModule = _componentsLoaderIndex.default;
        }, function (_appRun) {
            appRun = _appRun.default;
        }, function (_componentsDirectivesUpdateTitleDirective) {
            updateTitleDirective = _componentsDirectivesUpdateTitleDirective.default;
        }],
        execute: function () {

            System.import('bootstrap/css/bootstrap.css!').then(function () {
                System.import('dist/app-bootstrap-overrides.css!');
                System.import('dist/app.css!');
            });

            layoutModule = angular.module('layout', []);
            dependencies = [ocLazyLoad, layoutModule.name, loaderModule.name, loggerModule.name, angularBootstrap, 'ui.router', 'ct.ui.router.extras', 'ct.ui.router.extras.future'];
            app = angular.module('app', dependencies).provider('routerHelper', RouterHelperProvider).directive('updateTitle', updateTitleDirective).config(routesConfig).controller('AppController', AppController).run(appRun);

            angular.element(document).ready(function () {
                angular.bootstrap(document, [app.name], {
                    strictDi: true
                });
            });

            _export('default', app);
        }
    };
});