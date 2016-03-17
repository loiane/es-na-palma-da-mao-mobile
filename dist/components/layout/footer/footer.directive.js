'use strict';

System.register(['./footer.tpl.html!text'], function (_export, _context) {
    var template;
    function pageFooterDirective() {
        'ngInject';

        var directive = {
            restrict: 'E',
            template: template,
            replace: true,
            scope: {
                visible: '='
            }
        };

        return directive;
    }

    _export('default', pageFooterDirective);

    return {
        setters: [function (_footerTplHtmlText) {
            template = _footerTplHtmlText.default;
        }],
        execute: function () {}
    };
});