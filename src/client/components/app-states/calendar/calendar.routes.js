import template from './calendar.tpl.html!text';

/**
 * Configura rotas para o componente
 *
 * @param {Object} $stateProvider - $stateProvider do ui-router
 *
 * @returns {void}
 */
function calendarRoutes( $stateProvider ) {
    $stateProvider
        .state( 'app.calendar', {
            url: 'agenda',
            data: { title: 'Agenda ES' },
            nativeTransitions: {
                'type': 'fade'
            },
            views: {
                content: {
                    controller: 'calendarController as vm',
                    template: template
                }
            }
        } )
        .state( 'app.dashboard.calendar', {
            url: 'calendar',
            data: { title: 'AGENDA ES' },
            nativeTransitions: null,
            views: {
                'tab-calendar': {
                    controller: 'calendarController as vm',
                    template: template
                }
            }
        } );
}

export default[
    '$stateProvider', calendarRoutes
];
