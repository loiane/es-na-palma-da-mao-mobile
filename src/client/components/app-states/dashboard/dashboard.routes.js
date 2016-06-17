
import template from './dashboard.tpl.html!text';
import calendar from '../calendar/calendar.tpl.html!text';

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
        .state( 'app.dashboard.calendar', {
            url: 'calendar',
            data: { title: 'AGENDA ES' },
            nativeTransitions: null,
            views: {
                'tab-calendar': {
                    controller: 'calendarController as vm',
                    template: calendar
                }
            }
        } );
}

export default[
    '$stateProvider', dashBoardRoutes
];
