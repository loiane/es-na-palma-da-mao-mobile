import template from './configurations.html!text';

function configurationsRoutes($stateProvider) {
    $stateProvider
        .state('app.configurations', {
            url: 'configuracoes',
            views: {
                content: {
                    controller: 'ConfigurationsController as vm',
                    template: template
                }
            }
        });
}

export default [
    '$stateProvider',
    configurationsRoutes
];
