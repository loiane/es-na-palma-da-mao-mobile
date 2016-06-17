import template from './highlights.tpl.html!text';

/**
 * Configura rotas para o componente
 *
 * @param {Object} $stateProvider - $stateProvider do ui-router
 *
 * @returns {void}
 */
function highlightsRoutes( $stateProvider ) {
    $stateProvider
        .state( 'app.dashboard.newsHighlights', {
            url: '',
            data: { title: 'DESTAQUES' },
            nativeTransitions: null,
            views: {
                'tab-noticia': {
                    controller: 'highlightsController as vm',
                    template: template
                }
            }
        } );
}

export default[
    '$stateProvider', highlightsRoutes
];
