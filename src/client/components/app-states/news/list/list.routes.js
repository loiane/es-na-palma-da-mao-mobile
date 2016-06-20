import template from './list.tpl.html!text';

/**
 * Configura rotas para o componente
 *
 * @param {Object} $stateProvider - $stateProvider do ui-router
 *
 * @returns {void}
 */
function listRoutes( $stateProvider ) {
    $stateProvider
        .state( 'app.news', {
            url: '/news',
            data: { title: 'Notícias' },
            nativeTransitions: {
                'type': 'fade'
            },
            views: {
                content: {
                    controller: 'listController as vm',
                    template: template
                }
            }
        } );
}

export default[
    '$stateProvider', listRoutes
];
