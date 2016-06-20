let baseUrl = 'https://api.es.gov.br/news';

class NewsApiService {

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
    getNewsById( id ) {
        return this.$http
                   .get( `${baseUrl}/${id}` )
                   .then( response => response.data );
    }

    /**
     *
     * @returns {*}
     */
    getHighlightNews() {
        return this.$http
                   .get( `${baseUrl}/highlights` )
                   .then( response => response.data );
    }

    /**
     *
     * @param calendars
     * @param options
     * @returns {Array}
     */
    getNews( origins, options = {} ) {
        let today = new Date();
        let defaults = {
            dateMin: new Date( today.getFullYear(), 0, 1, 0 ),   // começo do ano corrente
            dateMax: new Date( today.getFullYear(), 11, 31, 0 )  // final do ano corrente
        };
        let params = angular.extend( { origins: origins }, defaults, options );

        return this.$http.get( baseUrl, { params: params } )
                   .then( response => {
                       return response.data;
                   } );
    }

    /**
     *
     * @returns {*}
     */
    getAvailableOrigins() {
        return this.$http
                   .get( `${baseUrl}/origins` )
                   .then( response => response.data );
    }
}
export default [ '$http', '$timeout', NewsApiService ];
