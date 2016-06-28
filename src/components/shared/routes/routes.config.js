import futureStates from './states.json!';

/**
 *
 *
 * @param {Object} $futureStateProvider - service
 *
 * @returns {void}
 */
function routesConfig( $futureStateProvider ) {
    $futureStateProvider.stateFactory( 'load', [
        '$ocLazyLoad', 'futureState', stateFactory
    ] );

    // Registra future states como placeholder para states reais
    futureStates.forEach( ( state ) => $futureStateProvider.futureState( state ) );

    /**
     * Factory para future states do tipo "load".
     * 1) Usa Systemjs para carregar o módulo requisitado junto com suas dependências.
     * 2) Usa $ocLazyLoad para injetar o módulo obtido no angularjs. Necessário pois a
     * configuração de rotas no angular só é possível na fase de config.
     *
     * @param {Object} $ocLazyLoad - $ocLazyLoad service do módulo 'oc.LazyLoad'
     * @param {Object} futureState - futureState representando um state na app. Em tempo de execução será substituído por um state real.
     *
     * @returns {Promise} - Uma promise
     */
    function stateFactory( $ocLazyLoad, futureState ) {
        return System.import( futureState.src )
                     .then( loadedModule => {
                         if ( futureState.prefetch ) {
                             futureState.prefetch.forEach( path => System.import( path ) );
                         }
                         return $ocLazyLoad.inject( loadedModule.name || loadedModule.default.name || loadedModule );
                     } )
                     // this needs to be done so that the future state handler doesn't use the
                     // component name as state name
                     .then( () => null )
                     .catch( console.error.bind( console ) ); // eslint-disable-line angular/log
    }
}

export default [
    '$futureStateProvider', routesConfig
];
