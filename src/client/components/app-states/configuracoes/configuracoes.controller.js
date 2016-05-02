class ConfiguracoesController {

    constructor( toast ) {
        this.toast = toast;

        this.activate();
    }

    activate() {
        this.toast.error( { title: 'Configuração Controller ativado' } );
    }
}

export default [ 'toast', ConfiguracoesController ];

