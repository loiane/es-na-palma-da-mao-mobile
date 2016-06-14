import template from './noticia.tpl.html!text';

/**
 * Configura rotas para o componente
 *
 * @param {Object} $stateProvider - $stateProvider do ui-router
 *
 * @returns {void}
 */
function noticiaRoutes( $stateProvider ) {
    $stateProvider
        .state( 'app.noticia', {
            url: 'noticia',
            data: { title: 'Noticia' },
            nativeTransitions: {
                'type': 'fade'
            },
            views: {
                content: {
                    controller: 'noticiaController as vm',
                    template: template
                }
            }
        } );
}

export default[
    '$stateProvider', noticiaRoutes
];
