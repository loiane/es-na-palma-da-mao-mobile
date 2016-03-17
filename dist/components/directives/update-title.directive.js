'use strict';

System.register([], function (_export, _context) {
    function UpdateTitle($rootScope, $timeout) {
        return {
            scope: {
                titlePrefix: '@'
            },
            link: function link(scope, element) {

                $rootScope.$on('$stateChangeSuccess', onstateChangeSuccess);

                function onstateChangeSuccess(event, toState, toParams, fromState, fromParams) {
                    var prefix = scope.titlePrefix || 'Portal do Cidadão | ES';
                    var pageTitle = '';

                    if (toState.data && toState.data.title) {
                        pageTitle = toState.data.title;
                    }

                    $timeout(function () {
                        element.text(prefix + ' - ' + pageTitle);
                    }, 0, false);
                };
            }
        };
    }

    return {
        setters: [],
        execute: function () {
            _export('default', ['$rootScope', '$timeout', UpdateTitle]);
        }
    };
});