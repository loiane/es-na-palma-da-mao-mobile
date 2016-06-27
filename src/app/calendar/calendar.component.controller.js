class CalendarController {

    /**
     * @constructor
     *
     * @param {Object} calendarApiService - calendarApiService service
     * @param {Object} $ionicLoading - ionic $ionicLoading service
     */
    constructor( $scope, calendarApiService, $ionicLoading ) {
        this.$scope = $scope;
        this.calendarApiService = calendarApiService;
        this.$ionicLoading = $ionicLoading;

        this.calendar = {};
        this.selectedCalendars = [];
        this.availableCalendars = [];

        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }

    /**
     * Ativa o component
     *
     * @returns {void}
     */
    activate() {
        this.$ionicLoading.show();
        this.getAvailableCalendars()
            .then( () => this.loadEvents() )
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
        this.$ionicLoading.show( 200 );

        return this.calendarApiService.getFullCalendars( this.selectedCalendars )
                   .then( fullCalendars => {
                       this.calendar.eventSources = fullCalendars;
                   } )
                   .finally( () => {
                       this.$ionicLoading.hide();
                   } );
    }

    /**
     * Evento disparado quando título do calendário é alterado
     *
     * @param {String} title - o novo title do calendário
     *
     * @returns {void}
     */
    onViewTitleChanged( title ) {
        this.viewTitle = title;
    }

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
    '$scope', 'calendarApiService', '$ionicLoading', CalendarController
];
