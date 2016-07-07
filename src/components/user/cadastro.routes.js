import templateCPF from './views/cpfVerificar.tpl.html';
import templateCPFCadastrado from './views/cpfCadastrado.tpl.html';
import templateCadastro from './views/cadastro.tpl.html';
import templateConfirmarEmail from './views/confirmarEmail.tpl.html';

/**
 * Configura rotas para o componente
 *
 * @param {Object} $stateProvider - $stateProvider do ui-router
 *
 * @returns {void}
 */
function loginRoutes( $stateProvider ) {
    $stateProvider
        .state( 'app.cpfVerificar', {
            url: 'cpfVerificar',
            data: { title: 'CPF' },
            views: {
                content: {
                    controller: 'cadastroController as vm',
                    template: templateCPF
                }
            }
        } )
        .state( 'app.cpfCadastrado', {
            url: 'cpfCadastrado',
            data: { title: 'CPF ja cadastrado' },
            views: {
                content: {
                    controller: 'cadastroController as vm',
                    template: templateCPFCadastrado
                }
            }
        } )
        .state( 'app.novoCadastro', {
            url: 'novoCadastro/:cpf',
            data: { title: 'Novo' },
            views: {
                content: {
                    controller: 'cadastroController as vm',
                    template: templateCadastro
                }
            }
        } )
        .state( 'app.confirmarEmail', {
            url: 'confirmarEmail/:cpf',
            data: { title: 'Confirmar E-mail' },
            views: {
                content: {
                    controller: 'cadastroController as vm',
                    template: templateConfirmarEmail
                }
            }
        } );
}

export default[
    '$stateProvider', loginRoutes
];
