import template from './principal.tpl.html!text';

/**
 * Configura rotas para o componente
 *
 * @param {Object} $stateProvider - $stateProvider do ui-router
 *
 * @returns {void}
 */
function storageRoutes( $stateProvider ) {
    $stateProvider
        .state( 'app.principal', {
            url: '/principal',
            views: {
                menuContent: {
                    controller: 'principalController as vm',
                    template: template
                }
            }
        } );
}

export default [
    '$stateProvider', storageRoutes
];
