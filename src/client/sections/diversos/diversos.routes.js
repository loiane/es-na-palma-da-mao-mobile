import template from './diversos.tpl.html!text';

function diversosRoutes($stateProvider) {
    $stateProvider
        .state('app.diversos', {
            url: 'diversos',
            data: { title: 'Diversos' },
            views: {
                content: {
                    controller: 'DiversosController as vm',
                    template: template
                }
            }
        });
}

export default[
    '$stateProvider',
    diversosRoutes 
];
