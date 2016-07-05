/** @class */
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
     */
    getProcessByNumber( number ) {
        return this.$http
            .get( `${this.settings.api.sep}/${number}` )
            .then( response => response.data );
    }
}

SepApiService.$inject = [ '$http', 'settings' ];

export default SepApiService;
