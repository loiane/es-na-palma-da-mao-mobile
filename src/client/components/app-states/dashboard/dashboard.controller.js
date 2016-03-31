class DashBoardController {

    constructor( logger ) {
        this.logger = logger;
        this.activate();
    }

    activate() {
        this.logger.info( 'DashBoard Controller ativado' );
    }
}

export default [ 'logger', DashBoardController ];


