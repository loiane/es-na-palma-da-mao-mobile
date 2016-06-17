import template from './dashboard.tpl.html!text';

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
            abstract: true,
            nativeTransitions: {
                'type': 'fade'
            },
            views: {
                content: {
                    controller: 'dashBoardController as vm',
                    template: template
                }
            }
        } );
}

export default[
    '$stateProvider', dashBoardRoutes
];
