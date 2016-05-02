class DashBoardController {

    constructor( toast ) {
        this.toast = toast;
        this.activate();
    }

    activate() {
        this.toast.show( { title: 'DashBoard Controller ativado' } );
    }
}

export default [ 'toast', DashBoardController ];


