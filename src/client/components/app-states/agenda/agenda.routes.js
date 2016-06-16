import template from './agenda.tpl.html!text';

/**
 * Configura rotas para o componente
 *
 * @param {Object} $stateProvider - $stateProvider do ui-router
 *
 * @returns {void}
 */
function agendaRoutes( $stateProvider ) {
    $stateProvider
        .state( 'app.agenda', {
            url: 'agenda',
            data: { title: 'Agenda' },
            nativeTransitions: {
                'type': 'fade'
            },
            views: {
                content: {
                    controller: 'agendaController as vm',
                    template: template
                }
            }
        } );
}

export default[
    '$stateProvider', agendaRoutes
];
