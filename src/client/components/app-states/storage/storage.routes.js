import template from './storage.tpl.html!text';

function storageRoutes( $stateProvider ) {
    $stateProvider
        .state( 'app.storage', {
            url: '/storage',
            views: {
                menuContent: {
                    controller: 'storageController',
                    template: template
                }
            }
        } );
}

export default [
    '$stateProvider', storageRoutes
];
