
class CadastroController {

    constructor( $http, $state, $stateParams, $ionicHistory, toast, appConfig, validadorCpfCnpj ) {
        this.$http = $http;
        this.$state = $state;
        this.$ionicHistory = $ionicHistory;

        this.toast = toast;
        this.appConfig = appConfig;
        this.validadorCpfCnpj = validadorCpfCnpj;

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
     * @returns $http promisse
     */
    cpfCadastrado( cpf ) {
        return this.$http.get( this.appConfig.apiESPM + 'api/Cidadao/ValidarCPF', {
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
        if ( !this.validadorCpfCnpj.valida_cpf( this.usuario.cpf ) ) {
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
                },
                    ( erro ) => {
                        //TODO: erro, dialog alert
                    } );

    }

    validarCodigoAtivacao() {
        this.$http.get( this.appConfig.apiESPM + '/Cidadao/ValidarCodigoAtivacao' );
    }
}

export default [ '$http', '$state', '$stateParams', '$ionicHistory', 'toast', 'appConfig', 'validadorCpfCnpj', CadastroController ];
