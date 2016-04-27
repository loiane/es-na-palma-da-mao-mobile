import menuTemplate from './menu.tpl.html!text';

function routesConfig( $stateProvider, $urlRouterProvider ) {
    $stateProvider
        .state( 'app', {
            url: '/app',
            abstract: true,
            template: menuTemplate,
            controller: 'menuController as vm'
        } );

    $urlRouterProvider.otherwise( '/app/storage' );
}

export default [
    '$stateProvider', '$urlRouterProvider', routesConfig
];



