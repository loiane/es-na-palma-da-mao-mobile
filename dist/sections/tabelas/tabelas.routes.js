'use strict';

System.register(['./tabelas.tpl.html!text'], function (_export, _context) {
    var template;


    function tabelasRoutes($stateProvider) {
        $stateProvider.state('app.tabelas', {
            url: 'tabelas',
            data: { title: 'Tabelas' },
            views: {
                content: {
                    controller: 'TabelasController as vm',
                    template: template
                }
            }
        });
    }

    return {
        setters: [function (_tabelasTplHtmlText) {
            template = _tabelasTplHtmlText.default;
        }],
        execute: function () {
            _export('default', ['$stateProvider', tabelasRoutes]);
        }
    };
});