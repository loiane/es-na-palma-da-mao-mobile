class TabelasController {

    constructor( toast ) {
        this.toast = toast;
        this.activate();
    }

    activate() {
        this.toast.show( { title: 'Tabelas Controller ativado' } );
    }
}

export default [ 'toast', TabelasController ];

