import template from './Configuracoes.tpl.html!text';

function configuracoesRoutes( $stateProvider ) {
    $stateProvider
        .state( 'app.configuracoes', {
            url: 'configuracoes',
            data: { title: 'Configurações' },
            views: {
                content: {
                    controller: 'configuracoesController as vm',
                    template: template
                }
            }
        } );
}

export default[
    '$stateProvider',
    configuracoesRoutes
];
