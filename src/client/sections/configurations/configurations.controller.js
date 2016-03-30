class ConfigurationsController {

    constructor( logger ) {
        this.logger = logger;

        this.activate();
    }


    activate() {
        this.logger.info( 'Configuração Controller ativado' );
    }
}

export default [ 'logger', ConfigurationsController ];

