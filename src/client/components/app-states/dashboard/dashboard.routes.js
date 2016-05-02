import template from './dashboard.tpl.html!text';

function dashBoardRoutes( $stateProvider ) {
    $stateProvider
        .state( 'app.dashboard', {
            url: '/dashboard',
            data: { title: 'Dashboard' },
            views: {
                content: {
                    controller: 'dashBoardController as vm',
                    template: template
                }
            }
        } );
}

export default[
    '$stateProvider',
    dashBoardRoutes
];
