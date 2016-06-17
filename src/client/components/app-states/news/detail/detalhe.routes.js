import detalheTemplate from './detalhe.tpl.html!text';

/**
 * Configura rotas para o componente
 *
 * @param {Object} $stateProvider - $stateProvider do ui-router
 *
 * @returns {void}
 */
function detalheRoutes( $stateProvider ) {
    $stateProvider
        .state( 'app.news/:id', {
            url: '/news/:id',
            data: { title: 'Detalhe Noticia' },
            views: {
                content: {
                    controller: 'detalheController as vm',
                    template: detalheTemplate
                }
            }
        } );
}

export default [ '$stateProvider', detalheRoutes ];
