import template from './tabelas.tpl.html!text';

function tabelasRoutes($stateProvider) {
    $stateProvider
        .state('app.tabelas', {
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

export default[
    '$stateProvider',
    tabelasRoutes 
];
