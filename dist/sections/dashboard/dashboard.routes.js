'use strict';

System.register(['./dashboard.tpl.html!text'], function (_export, _context) {
    var template;


    function dashBoardRoutes($stateProvider) {
        $stateProvider.state('app.dashboard', {
            url: 'dashboard',
            data: { title: 'Dashboard' },
            views: {
                content: {
                    controller: 'dashBoardController as vm',
                    template: template
                }
            }
        });
    }

    return {
        setters: [function (_dashboardTplHtmlText) {
            template = _dashboardTplHtmlText.default;
        }],
        execute: function () {
            _export('default', ['$stateProvider', dashBoardRoutes]);
        }
    };
});