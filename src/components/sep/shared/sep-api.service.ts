import {IHttpService, IPromise} from 'angular';

class SepApiService {

    static $inject: string[] = [ '$http', 'settings' ];

    /**
     * @param {Object} $http - angular $http service
     * @param {Object} settings - application settings
     * @constructor
     */
    constructor( private $http: IHttpService, private settings ) {
    }

    /**
     *
     * @param {string} procNumber - process number
     * @returns {IPromise<Array>}
     */
    getProcessByNumber( procNumber: string ): IPromise<any[]> {
        return this.$http
                   .get( `${this.settings.api.sep}/${procNumber}` )
                   .then( response => response.data );
    }
}

export default SepApiService;
