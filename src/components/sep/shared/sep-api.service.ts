class SepApiService {

    /**
     * @param {Object} $http - angular $http service
     * @param {Object} settings - application settings
     * @constructor
     */
    constructor( $http, settings ) {
        this.$http = $http;
        this.settings = settings;
    }

    /**
     * @param {string} number: Process number
     * @returns {Object} angular HTTP promisse with response.data
     * //TODO: Refact after api is done
     */
    getProcessByNumber( number ) {
        return this.$http
                   .get( `${this.settings.api.sep}${number}` )
                   .then( response => response.data );
    }
}

export default ['$http', 'settings', SepApiService];
