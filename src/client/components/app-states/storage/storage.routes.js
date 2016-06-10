import template from './web/storage.tpl.html!text!platform';

/**
 * Configura rotas para o componente
 *
 * @param {Object} $stateProvider - $stateProvider do ui-router
 *
 * @returns {void}
 */
function storageRoutes( $stateProvider ) {
    $stateProvider
        .state( 'app.storage', {
            url: 'storage',
            nativeTransitions: {
                'type': 'fade'
            },
            data: { title: 'Storage' },
            views: {
                content: {
                    controller: 'storageController as vm',
                    template: template
                }
            }
        } );
}

export default [
    '$stateProvider', storageRoutes
];

