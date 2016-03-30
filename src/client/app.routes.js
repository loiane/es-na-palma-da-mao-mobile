
function routesConfig( $stateProvider ) {
    'ngInject';

    $stateProvider
        .state( 'app', {
            url: '/',
            abstract: true,
            views: {
                page: {
                    //controller: 'AppController as vm',
                    template: '<ui-view name="content"></ui-view>'
                }
            }
        } );

}

export default[
    '$stateProvider',
    routesConfig
];
