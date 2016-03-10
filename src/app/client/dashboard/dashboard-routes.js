import template from './dashboard.html!text';

function dashBoardRoutes($stateProvider) {
    $stateProvider
        .state('core.dashboard', {
            url: 'dashboard',
            views: {
                core: {
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
