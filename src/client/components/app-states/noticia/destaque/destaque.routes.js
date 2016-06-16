import destaqueTemplate from './destaque.tpl.html!text';

/**
 * Configura rotas para o componente
 *
 * @param {Object} $stateProvider - $stateProvider do ui-router
 *
 * @returns {void}
 */
function destaqueRoutes( $stateProvider ) {
    $stateProvider
        .state( 'app.dashboard.noticia', {
            url: '',
            data: { title: 'DESTAQUES' },
            nativeTransitions: null,
            views: {
                'tab-noticia': {
                    controller: 'destaqueController as vm',
                    template: destaqueTemplate
                }
            }
        } );
}

export default[
    '$stateProvider', destaqueRoutes
];
