import listaTemplate from './views/lista.tpl.html!text';
import detalheTemplate from './views/detalhe.tpl.html!text';

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
                    template: listaTemplate
                }
            }
        } )
        .state( 'app.noticiaDetalhe/:id', {
            url: 'noticiaDetalhe/:id',
            data: { title: 'Detalhe Noticia' },
            views: {
                content: {
                    controller: 'noticiaController as vm',
                    template: detalheTemplate
                }
            }
        } );
}

export default[
    '$stateProvider', noticiaRoutes
];
