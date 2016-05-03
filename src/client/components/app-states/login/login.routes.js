import template from './login.tpl.html!text';

/**
 * Configura rotas para o componente
 *
 * @param {Object} $stateProvider - $stateProvider do ui-router
 *
 * @returns {void}
 */
function loginRoutes( $stateProvider ) {
    $stateProvider
        .state( 'app.login', {
            url: '/login',
            data: { title: 'Login' },
            views: {
                menuContent: {
                    controller: 'loginController as vm',
                    template: template
                }
            }
        } );
}

export default[
    '$stateProvider', loginRoutes
];
