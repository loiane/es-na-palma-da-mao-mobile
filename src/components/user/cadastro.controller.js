class CadastroController {

    constructor( $http, $state, $stateParams, $ionicHistory, toast, settings, cpfService ) {
        this.$http = $http;
        this.$state = $state;
        this.$ionicHistory = $ionicHistory;
        this.toast = toast;
        this.settings = settings;
        this.cpfService = cpfService;
        this.usuario = {};

        if ( $stateParams.cpf ) {
            this.usuario.cpf = $stateParams.cpf;
        }
    }

    /**
     * Retorna para tela de login
     */
    goToLogin() {
        this.$ionicHistory.nextViewOptions( {
            disableAnimate: true,
            historyRoot: true
        } );

        this.$state.go( 'app.login' );
    }

    /**
     * Verifica se o CPF ja está cadastrado no Acesso ES
     * @returns $http promise
     */
    cpfCadastrado( cpf ) {

        //todo: @vizeke refatorar em um serviço
        return this.$http.get( this.settings.apiESPM + 'api/Cidadao/ValidarCPF', {
            params: {
                cpf: cpf
            }
        } );
    }

    /**
     * Verifica se o CPF foi preenchido corretamente e executa uma chamada a API do Acesso ES para verificar se o CPF existe ou não.
     */
    verificaCpf() {
        //Verifica CPF vazio
        if ( !this.usuario.cpf ) {
            this.toast.showActionToast( {
                title: 'CPF não preenchido'
            } );
            return;
        }

        //Verifica CPF válido
        if ( !this.cpfService.validar( this.usuario.cpf ) ) {
            this.toast.showActionToast( {
                title: 'CPF inválido'
            } );
            return;
        }

        this.cpfCadastrado( this.usuario.cpf )
            .then( ( isCPFCadastrado ) => {
                if ( isCPFCadastrado ) {
                    this.$state.go( 'app.cpfCadastrado' );
                } else {
                    this.$state.go( 'app.novoCadastro' );
                }
            }, () => {
                //TODO: erro, dialog alert
            } );

    }

    validarCodigoAtivacao() {
        this.$http.get( this.settings.apiESPM + '/Cidadao/ValidarCodigoAtivacao' );
    }
}

export default [
    '$http',
    '$state',
    '$stateParams',
    '$ionicHistory',
    'toast',
    'settings',
    'cpfService',
    CadastroController
];
