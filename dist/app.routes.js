'use strict';

System.register([], function (_export, _context) {
    routesConfig.$inject = ["$stateProvider"];
    function routesConfig($stateProvider) {
        'ngInject';

        $stateProvider.state('app', {
            url: '/',
            abstract: true,
            views: {
                page: {
                    template: '<ui-view name="content"></ui-view>'
                }
            }
        });
    }

    return {
        setters: [],
        execute: function () {
            _export('default', ['$stateProvider', routesConfig]);
        }
    };
});