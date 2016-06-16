let eventsEndPoint = 'http://10.243.9.4/events';

class eventosApiService {

    /**
     *
     * @param {Object} $http - angular $http service
     */
    constructor( $http ) {
        this.$http = $http;
    }

    /**
     *
     * @param agendas
     * @param options
     * @returns {Array}
     */
    obterEventos( agendas, options = {} ) {
        let hoje = new Date();
        let defaults = {
            singleEvents: true,
            orderBy: 'startTime',
            timeMin: new Date( hoje.getFullYear(), 0, 1, 0 ),   // começo do ano corrente
            timeMax: new Date( hoje.getFullYear(), 11, 31, 0 ), // final do ano corrente
            timeZone: 'America/Sao_Paulo' // an option!
        };
        return this.$http.get( eventsEndPoint, { params: angular.extend( { agendas: agendas }, defaults, options ) } )
                   .then( response => response.data );
    }
}

export default [ '$http', eventosApiService ];