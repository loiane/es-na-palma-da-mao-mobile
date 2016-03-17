'use strict';

System.register(['./header.tpl.html!text'], function (_export, _context) {
    var template;
    function pageHeaderDirective() {
        'ngInject';

        var directive = {
            restrict: 'E',
            template: template,
            scope: {
                visible: '='
            },
            replace: true
        };

        return directive;
    }

    _export('default', pageHeaderDirective);

    return {
        setters: [function (_headerTplHtmlText) {
            template = _headerTplHtmlText.default;
        }],
        execute: function () {}
    };
});