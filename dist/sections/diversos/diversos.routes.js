'use strict';

System.register(['./diversos.tpl.html!text'], function (_export, _context) {
    var template;


    function diversosRoutes($stateProvider) {
        $stateProvider.state('app.diversos', {
            url: 'diversos',
            data: { title: 'Diversos' },
            views: {
                content: {
                    controller: 'DiversosController as vm',
                    template: template
                }
            }
        });
    }

    return {
        setters: [function (_diversosTplHtmlText) {
            template = _diversosTplHtmlText.default;
        }],
        execute: function () {
            _export('default', ['$stateProvider', diversosRoutes]);
        }
    };
});