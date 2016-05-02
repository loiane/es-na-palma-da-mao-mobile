class DiversosController {

    constructor( toast ) {
        this.toast = toast;
        this.activate();
    }

    activate() {
        this.toast.show( {
            title: 'Diversos Controller ativado!'
        } );
    }
}

export default [ 'toast', DiversosController ];

