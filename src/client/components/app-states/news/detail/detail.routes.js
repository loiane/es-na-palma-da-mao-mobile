import template from './detail.tpl.html!text';

/**
 * Configura rotas para o componente
 *
 * @param {Object} $stateProvider - $stateProvider do ui-router
 *
 * @returns {void}
 */
function detailRoutes( $stateProvider ) {
    $stateProvider
        .state( 'app.news/:id', {
            url: '/news/:id',
            data: { title: 'Notícia' },
            views: {
                content: {
                    controller: 'detailController as vm',
                    template: template
                }
            }
        } );
}

export default [ '$stateProvider', detailRoutes ];
