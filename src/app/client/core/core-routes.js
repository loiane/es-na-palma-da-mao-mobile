import template from './core.html!text';

function routesConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('core', {
            url: '/',
            abstract: true,
            views: {
                page: {
                    controller: 'CoreController as vm',
                    template: template
                }
            }
        });
}

export default[
    '$stateProvider',
    routesConfig 
];
