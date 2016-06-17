let baseUrl = 'https://api.es.gov.br/calendars';
let eventsEndPoint = 'https://api.es.gov.br/calendars/events';

class CalendarApiService {

    /**
     *
     * @param {Object} $http - angular $http service
     */
    constructor( $http ) {
        this.$http = $http;
    }

    /**
     *
     * @returns {*}
     */
    getAvailableCalendars() {
        return this.$http
                   .get( baseUrl )
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
        return this.$http.get( eventsEndPoint, { params: angular.extend( { calendars: calendars }, defaults, options ) } )
                   .then( response => response.data );
    }
}
export default [ '$http', CalendarApiService ];
