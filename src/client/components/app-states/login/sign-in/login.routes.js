import templateLogin from './login.tpl.html!text';

/**
 * Configura rotas para o componente
 *
 * @param {Object} $stateProvider - $stateProvider do ui-router
 *
 * @returns {void}
 */
function loginRoutes($stateProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            nativeTransitions: {
                'type': 'fade'
            },
            controller: 'loginController as vm',
            template: templateLogin
        });
}

export default [
    '$stateProvider', loginRoutes
];
