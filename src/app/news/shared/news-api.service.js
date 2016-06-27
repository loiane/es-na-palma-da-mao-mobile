class NewsApiService {

    /**
     *
     * @param {Object} $http - angular $http service
     */
    constructor( $http, settings ) {
        this.$http = $http;
        this.settings = settings;

        this.defaultPage = 0;
        this.defaultPageSize = 10;
    }

    /**
     *
     * @returns {*}
     */
    getNewsById( id ) {
        return this.$http
                   .get( `${this.settings.api.news}/${id}` )
                   .then( response => response.data );
    }

    /**
     *
     * @returns {*}
     */
    getHighlightNews() {
        return this.$http
                   .get( `${this.settings.api.news}/highlights` )
                   .then( response => response.data );
    }

    /**
     *
     * @param calendars
     * @param options
     * @returns {Array}
     */
    getNews( options = {} ) {
        let today = new Date();
        let defaults = {
            origins: [],
            dateMin: new Date( today.getFullYear(), 0, 1, 0 ),   // começo do ano corrente
            dateMax: new Date( today.getFullYear(), 11, 31, 0 ),  // final do ano corrente
            pageNumber: this.defaultPage,
            pageSize: this.defaultPageSize
        };

        let params = angular.extend( {}, defaults, options );

        return this.$http.get( this.settings.api.news, { params: params } )
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
                   .get( `${this.settings.api.news}/origins` )
                   .then( response => response.data );
    }
}
export default [ '$http', 'settings', NewsApiService ];
