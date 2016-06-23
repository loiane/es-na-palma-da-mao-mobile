import templateHome from './home.tpl.html!text';

/**
 * Configura rotas para o componente
 *
 * @param {Object} $stateProvider - $stateProvider do ui-router
 *
 * @returns {void}
 */
function homeRoutes( $stateProvider ) {
    $stateProvider
        .state( 'home', {
            url: '/home',
            nativeTransitions: {
                'type': 'fade'
            },
            controller: 'homeController as vm',
            template: templateHome
        } );
}

export default [
    '$stateProvider', homeRoutes
];
