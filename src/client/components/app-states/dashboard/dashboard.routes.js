import template from './dashboard.tpl.html!text';
import noticia from '../noticia/noticia.tpl.html!text';
import agenda from '../agenda/agenda.tpl.html!text';

/**
 * Configura rotas para o componente
 *
 * @param {Object} $stateProvider - $stateProvider do ui-router
 *
 * @returns {void}
 */
function dashBoardRoutes( $stateProvider ) {
    $stateProvider
        .state( 'app.dashboard', {
            url: 'dashboard/',
            data: { title: 'Dashboard' },
            nativeTransitions: {
                'type': 'fade'
            },
            views: {
                content: {
                    controller: 'dashBoardController as vm',
                    template: template
                }
            }
        } )
        .state( 'app.dashboard.agenda', {
            url: 'agenda',
            data: { title: 'AGENDA' },
            views: {
                'tab-agenda': {
                    controller: 'agendaController as vm',
                    template: agenda
                }
            }
        } )
        .state( 'app.dashboard.noticia', {
            url: 'noticia',
            data: { title: 'DESTAQUES' },
            views: {
                'tab-noticia': {
                    controller: 'noticiaController as vm',
                    template: noticia
                }
            }
        } );
}

export default[
    '$stateProvider', dashBoardRoutes
];
