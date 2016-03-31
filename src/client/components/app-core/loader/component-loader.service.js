/**
 * Provides functionality to load components at runtime.
 */
class ComponentLoaderService {
    /**
     *
     * @param $q
     * @param $ocLazyLoad
     * @param $injector
     * @param system
     */
    constructor( $q, $ocLazyLoad, system ) {
        this._$q = $q;
        this._$ocLazyLoad = $ocLazyLoad;
        this._system = system;
    }

    /**
     * Loads a component with the given name. It will automatically look for the component in the components folder.
     * E.g. if you pass `popup` it will try to load the component from "components/popup/index".
     *
     * @param {String} componentName
     * @returns {Promise}
     */
    loadComponent( componentName ) {
        if ( !this._$ocLazyLoad.isLoaded( componentName ) ) {
            return this._system.import( '.dist/components/' + componentName + '/index' ).then( loadedComponent => {
                const name = loadedComponent.name || loadedComponent.default.name || loadedComponent;
                return this._$ocLazyLoad.inject( name );
            } );
        }

        return this._$q.when( componentName );
    }

}

export default[
    '$q',
    '$ocLazyLoad',
    'system',
    ComponentLoaderService
];
