'use strict';

System.register([], function (_export, _context) {
    function appRun($rootScope, $state, routerHelper) {
        $rootScope.$state = $state;

        routerHelper.configureRoutingEvents();
    }

    return {
        setters: [],
        execute: function () {
            _export('default', ['$rootScope', '$state', 'routerHelper', appRun]);
        }
    };
});