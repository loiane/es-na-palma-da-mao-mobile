/**
 * Provêm funcionalidade para carregar componentes em runtime
 */
class ComponentLoaderService {
    /**
     * @constructor
     *
     * @param {Object} $q - xx service
     * @param {Object} $ocLazyLoad - xx service
     * @param {Object} system - xx service
     *
     * @returns {void}
     */
    constructor( $q, $ocLazyLoad, system ) {
        this._$q = $q;
        this._$ocLazyLoad = $ocLazyLoad;
        this._system = system;
    }

    /**
     * Loads a component with the given name. It will automatically look for the component in the
     * components folder. E.g. if you pass `popup` it will try to load the component from
     * "components/popup/index".
     *
     * @param {String} componentName - o nome do componente sendo carregado
     *
     * @returns {Promise} - uma promise
     */
    loadComponent( componentName ) {
        if ( !this._$ocLazyLoad.isLoaded( componentName ) ) {
            return this._system.import( `components/${componentName}/index` ).then( loadedComponent => {
                const name = loadedComponent.name || loadedComponent.default.name || loadedComponent;
                return this._$ocLazyLoad.inject( name );
            } );
        }

        return this._$q.when( componentName );
    }

}

export default[
    '$q', '$ocLazyLoad', 'system', ComponentLoaderService
];
