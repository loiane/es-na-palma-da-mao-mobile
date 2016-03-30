import template from './configurations.tpl.html!text';

function configurationsRoutes( $stateProvider ) {
    $stateProvider
        .state( 'app.configurations', {
            url: 'configuracoes',
            data: { title: 'Configurações' },
            views: {
                content: {
                    controller: 'configurationsController as vm',
                    template: template
                }
            }
        } );
}

export default[
    '$stateProvider',
    configurationsRoutes
];
