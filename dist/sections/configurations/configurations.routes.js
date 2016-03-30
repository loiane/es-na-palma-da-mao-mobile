'use strict';

System.register(['./configurations.tpl.html!text'], function (_export, _context) {
    var template;


    function configurationsRoutes($stateProvider) {
        $stateProvider.state('app.configurations', {
            url: 'configuracoes',
            data: { title: 'Configurações' },
            views: {
                content: {
                    controller: 'configurationsController as vm',
                    template: template
                }
            }
        });
    }

    return {
        setters: [function (_configurationsTplHtmlText) {
            template = _configurationsTplHtmlText.default;
        }],
        execute: function () {
            _export('default', ['$stateProvider', configurationsRoutes]);
        }
    };
});