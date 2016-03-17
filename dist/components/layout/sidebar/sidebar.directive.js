'use strict';

System.register(['./sidebar.tpl.html!text'], function (_export, _context) {
    var template;
    function sidebarDirective() {
        'ngInject';

        var directive = {
            restrict: 'E',
            template: template,
            scope: {
                visible: '=',
                showFooterControls: '=',
                showUserInfo: '=',
                appName: '=',
                userName: '='
            },
            replace: true
        };

        return directive;
    }

    _export('default', sidebarDirective);

    return {
        setters: [function (_sidebarTplHtmlText) {
            template = _sidebarTplHtmlText.default;
        }],
        execute: function () {}
    };
});