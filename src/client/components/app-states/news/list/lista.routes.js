import listaTemplate from './lista.tpl.html!text';

/**
 * Configura rotas para o componente
 *
 * @param {Object} $stateProvider - $stateProvider do ui-router
 *
 * @returns {void}
 */
function listaRoutes( $stateProvider ) {
    $stateProvider
        .state( 'app.news', {
            url: '/news',
            data: { title: 'Noticia' },
            nativeTransitions: {
                'type': 'fade'
            },
            views: {
                content: {
                    controller: 'listaController as vm',
                    template: listaTemplate
                }
            }
        } );
}

export default[
    '$stateProvider', listaRoutes
];
