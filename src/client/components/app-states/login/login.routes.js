import templateLogin from './web/login.tpl.html!text!platform';
import templateCPF from './web/cpfVerificar.tpl.html!text!platform';
import templateCPFCadastrado from './web/cpfCadastrado.tpl.html!text!platform';
import templateCadastro from './web/cadastro.tpl.html!text!platform';

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
            url: 'login',
            data: { title: 'Login' },
            views: {
                content: {
                    controller: 'loginController as vm',
                    template: templateLogin
                }
            }
        } )
        .state( 'app.cpfVerificar', {
            url: 'cpfVerificar',
            data: { title: 'CPF' },
            views: {
                content: {
                    controller: 'loginController as vm',
                    template: templateCPF
                }
            }
        } )
        .state( 'app.cpfCadastrado', {
            url: 'cpfCadastrado',
            data: { title: 'CPF ja cadastrado' },
            views: {
                content: {
                    controller: 'loginController as vm',
                    template: templateCPFCadastrado
                }
            }
        } )
        .state( 'app.novoCadastro', {
            url: 'novoCadastro/:cpf',
            data: { title: 'Novo' },
            views: {
                content: {
                    controller: 'loginController as vm',
                    template: templateCadastro
                }
            }
        } );
}

export default[
    '$stateProvider', loginRoutes
];
