import template from './Configuracoes.tpl.html!text';

/**
 * Configura rotas para o componente
 *
 * @param {Object} $stateProvider - $stateProvider do ui-router
 *
 * @returns {void}
 */
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
    '$stateProvider', configuracoesRoutes
];
