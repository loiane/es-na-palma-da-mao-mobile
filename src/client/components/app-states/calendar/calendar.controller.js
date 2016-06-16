class CalendarController {

    /**
     * @constructor
     *
     * @param {Object} calendarApiService - calendarApiService service
     * @param {Object} $ionicLoading - ionic $ionicLoading service
     * @param {Object} toast - toast service
     */
    constructor( calendarApiService, $ionicLoading, toast ) {
        this.calendarApiService = calendarApiService;
        this.$ionicLoading = $ionicLoading;
        this.toast = toast;

        this.calendar = {};
        this.selectedCalendars = [];
        this.availableCalendars = []

        this.activate();
    }

    /**
     * Ativa o controller
     *
     * @returns {void}
     */
    activate() {
        this.$ionicLoading.show();
        this.getAvailableCalendars()
            .then( () => this._loadEvents() )
            .finally( () => this.$ionicLoading.hide() );

    }

    /**
     * Carrega lista de calendars disponíveis
     *
     * @returns {*}
     */
    getAvailableCalendars() {
        return this.calendarApiService.getAvailableCalendars()
                   .then( calendars => {
                       this.selectedCalendars = this.availableCalendars = calendars.map( calendar => calendar.name );
                   } );
    }

    /**
     * Carrega os eventos no calendário
     */
    loadEvents() {
        this.$ionicLoading.show( { delay: 300 } );
        return this._loadEvents()
                   .finally( () => this.$ionicLoading.hide() );
    };

    /**
     * Carrega os eventos no calendário
     */
    _loadEvents() {
        return this.calendarApiService.getFullCalendars( this.selectedCalendars )
                   .then( fullCalendars => {
                       this.calendar.eventSources = fullCalendars;
                   } )
                   .finally( () => {
                       const totalEvents = this.calendar.eventSources.reduce( ( total, calendar ) => {
                           return total + calendar.items.length;
                       }, 0 );
                       this.toast.show( { title: `${totalEvents} eventos carregados` } );
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
        this.calendar.currentDate = new Date();
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
        let currentCalendarDate = new Date( this.calendar.currentDate );

        today.setHours( 0, 0, 0, 0 );
        currentCalendarDate.setHours( 0, 0, 0, 0 );
        return today.getTime() === currentCalendarDate.getTime();
    }
}

export default [
    'calendarApiService', '$ionicLoading', 'toast', CalendarController
];

/////////////////////////////////////////////////////////////////////////////////////////////



