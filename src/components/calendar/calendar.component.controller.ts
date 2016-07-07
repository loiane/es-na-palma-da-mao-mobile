class CalendarController {

    private calendar = {};
    private selectedCalendars = [];
    private availableCalendars = [];
    private viewTitle:string = '';

    /**
     * @constructor
     *
     * @param {Object} $scope
     * @param {Object} calendarApiService - calendarApiService service
     * @param {Object} $ionicLoading - ionic $ionicLoading service
     */
    constructor( private $scope,
                 private calendarApiService,
                 private $ionicLoading ) {
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }

    /**
     * Ativa o component
     *
     * @returns {void}
     */
    activate() {
        this.showLoading()
            .then( () => this.getAvailableCalendars() )
            .then( availableCalendars => this.loadEvents( availableCalendars ) )
            .finally( () => this.hideLoading() );
    }

    /**
     *
     * @param delay
     * @returns {any}
     */
    showLoading( delay = 0 ) {
        return this.$ionicLoading.show( {delay: delay} );
    }

    /**
     *
     * @returns {any}
     */
    hideLoading() {
        return this.$ionicLoading.hide();
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
                       return this.selectedCalendars;
                   } );
    }

    /**
     * Carrega os eventos no calendário
     */
    loadEvents( selectedCalendars ) {
        return this.showLoading( 200 )
                   .then( () => this.calendarApiService.getFullCalendars( selectedCalendars ) )
                   .then( calendars => {
                       this.calendar.eventSources = calendars;
                       return calendars;
                   } )
                   .finally( () => this.hideLoading() );
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
     * @returns {boolean} - true ou false dependendo se a data selecionada no calendário é a data corrente
     */
    isToday() {
        let today = new Date();
        let currentCalendarDate = new Date( this.calendar.currentDate );

        today.setHours( 0, 0, 0, 0 );
        currentCalendarDate.setHours( 0, 0, 0, 0 );

        return today.getTime() === currentCalendarDate.getTime();
    }
}

CalendarController.$inject = ['$scope', 'calendarApiService', '$ionicLoading'];

export default CalendarController;
