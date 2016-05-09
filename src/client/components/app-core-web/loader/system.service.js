/**
 * Wrapper around System
 */
class SystemService {

    constructor( $log ) {
        this.$log = $log;
    }

    /**
     * Imports a component from the given path, relative to the baseURL set in SystemJS.
     *
     * @param {String} path - o path para o componente sendo carregado
     *
     * @returns {Promise}
     */
    import( path ) {
        return System.import( path )
                     .catch( ( err ) => this.$log.error( err.stack ) );
    }
}

export default [ SystemService ];
