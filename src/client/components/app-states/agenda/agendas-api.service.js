let agendasEndPoint = 'http://10.243.9.4/agendas';

class agendasApiService {

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
    obterAgendas() {
        return this.$http
                   .get( agendasEndPoint )
                   .then( response => response.data );
    }
}
export default [ '$http', agendasApiService ];
