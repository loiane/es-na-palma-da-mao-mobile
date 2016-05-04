import menuTemplate from './menu.tpl.html!text';

/**
 * Configura rotas
 *
 * @param {Object} $stateProvider - $stateProvider service
 * @param {Object} $urlRouterProvider - $urlRouterProvider service
 *
 * @returns {void}
 */
function routesConfig( $stateProvider, $urlRouterProvider ) {
    $stateProvider
        .state( 'app', {
            url: '/app/',
            abstract: true,
            template: menuTemplate,
            controller: 'menuController as vm'
        } );

    $urlRouterProvider.otherwise( '/app/principal' );
}

export default [
    '$stateProvider', '$urlRouterProvider', routesConfig
];

