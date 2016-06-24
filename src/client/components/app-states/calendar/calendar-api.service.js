class CalendarApiService {

    /**
     * @constructor
     *
     * @param {Object} $http - angular $http service
     * @param appConfig
     */
    constructor( $http, appConfig ) {
        this.$http = $http;
        this.calendarsEndPoint = appConfig.api.calendars;
        this.eventsEndPoint = `${appConfig.api.calendars}/events`;
    }

    /**
     *
     * @returns {*}
     */
    getAvailableCalendars() {
        return this.$http
                   .get( this.calendarsEndPoint )
                   .then( response => response.data );
    }

    /**
     *
     * @param calendars
     * @param options
     * @returns {Array}
     */
    getFullCalendars( calendars, options = {} ) {
        let today = new Date();
        let defaults = {
            singleEvents: true,
            orderBy: 'startTime',
            timeMin: new Date( today.getFullYear(), 0, 1, 0 ),   // começo do ano corrente
            timeMax: new Date( today.getFullYear(), 11, 31, 0 ), // final do ano corrente
            timeZone: 'America/Sao_Paulo' // an option!
        };
        return this.$http.get( this.eventsEndPoint, { params: angular.extend( { calendars: calendars }, defaults, options ) } )
                   .then( response => response.data );
    }
}
export default [ '$http', 'appConfig', CalendarApiService ];
