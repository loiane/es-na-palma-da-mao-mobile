class AgendaController {

    /**
     * @constructor
     *
     * @param {Object} agendasApiService - agendasApiService service
     * @param {Object} eventosApiService - eventosApiService service
     * @param {Object} $ionicLoading - ionic $ionicLoading service
     * @param {Object} toast - toast service
     */
    constructor( agendasApiService, eventosApiService, $ionicLoading, toast ) {
        this.agendasApiService = agendasApiService;
        this.eventosApiService = eventosApiService;
        this.$ionicLoading = $ionicLoading;
        this.toast = toast;

        this.calendario = {};
        this.agendasSelecionadas = [];
        this.agendasDisponiveis = []

        this.activate();
    }

    /**
     * Ativa o controller
     *
     * @returns {void}
     */
    activate() {
        this.$ionicLoading.show();
        this.carregarListaDeAgendas()
            .then( () => this._carregarEventos() )
            .finally( () => this.$ionicLoading.hide() );

    }

    /**
     * Carrega lista de agendas disponíveis
     *
     * @returns {*}
     */
    carregarListaDeAgendas() {
        return this.agendasApiService.obterAgendas()
                   .then( agendas => {
                       this.agendasSelecionadas = this.agendasDisponiveis = agendas.map( agenda => agenda.nome );
                   } );
    }

    /**
     * Carrega os eventos no calendário
     */
    carregarEventos() {
        this.$ionicLoading.show( { delay: 300 } );
        return this._carregarEventos()
                   .finally( () => this.$ionicLoading.hide() );
    };

    /**
     * Carrega os eventos no calendário
     */
    _carregarEventos() {
        return this.eventosApiService.obterEventos( this.agendasSelecionadas )
                   .then( agendas => {
                       this.calendario.eventSources = agendas;
                   } )
                   .finally( () => {
                       const totalEventos = this.calendario.eventSources.reduce( ( total, agenda ) => {
                           return total + agenda.items.length;
                       }, 0 );
                       this.toast.show( { title: `${totalEventos} eventos carregados` } );
                   } );
    };

    /**
     * Evento disparado quando evento é selecionado
     * @param {Object} event - o evento selecionado
     *
     * @returns {void}
     */
    onEventSelected( event ) {
        this.toast.show( { title: `Evento ${event.startTime}-${event.endTime},${event.title} selecionado` } );
    };

    /**
     * Evento disparado quando título do calendário é alterado
     *
     * @param {String} title - o novo title do calendário
     *
     * @returns {void}
     */
    onViewTitleChanged( title ) {
        this.viewTitle = title;
    };

    /**
     * Altera a data do calendário para a data corrente (hoje e agora)
     *
     * @returns {void}
     */
    today() {
        this.calendario.currentDate = new Date();
    }

    /**
     * Indica se a data selecionada no calendário é a data corrente
     *
     * @param {String} title - o novo title do calendário
     *
     * @returns {Bool} - true ou false dependendo se a data selecionada no calendário é a data corrente
     */
    isToday() {
        let today = new Date();
        let currentCalendarDate = new Date( this.calendario.currentDate );

        today.setHours( 0, 0, 0, 0 );
        currentCalendarDate.setHours( 0, 0, 0, 0 );
        return today.getTime() === currentCalendarDate.getTime();
    }
}

export default [
    'agendasApiService', 'eventosApiService', '$ionicLoading', 'toast', AgendaController
];

/////////////////////////////////////////////////////////////////////////////////////////////



