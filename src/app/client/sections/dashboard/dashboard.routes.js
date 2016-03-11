import template from './dashboard.html!text';

function dashBoardRoutes($stateProvider) {
    $stateProvider
        .state('app.dashboard', {
            url: 'dashboard',
            views: {
                content: {
                    controller: 'DashBoardController as vm',
                    template: template
                }
            }
        });
}

export default [
    '$stateProvider',
    dashBoardRoutes
];
