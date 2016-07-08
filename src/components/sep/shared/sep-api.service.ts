import {IHttpService, IPromise} from 'angular';

class SepApiService {

    /**
     * @param {Object} $http - angular $http service
     * @param {Object} settings - application settings
     * @constructor
     */
    constructor( private $http:IHttpService, private settings ) {
    }

    /**
     *
     * @param {string} number - process number
     * @returns {IPromise<Array>}
     */
    getProcessByNumber( number:string ):IPromise<any[]> {
        return this.$http
                   .get( `${this.settings.api.sep}/${number}` )
                   .then( response => response.data );
    }
}
SepApiService.$inject = [ '$http', 'settings' ];

export default SepApiService;
