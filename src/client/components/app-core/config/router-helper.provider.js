import futureStates from './states.json!';

/**
* Aplica configurações de roteamento à aplicação. Usa "FutureStates" para
* configurar rotas de uma fonte externa(como um JSON ou DB) em runtime, uma vez que
* UI-Router expõe $stateProvider à aplicação somente na fase de config, e não em runtime.
*
* Ref: https://christopherthielen.github.io/ui-router-extras/#/future
*
* @param {Object} $urlRouterProvider - $urlRouterProvider do angularjs.
* @param {Object} $httpProvider - $httpProvider do angularjs.
* @param {Object} $locationProvider - $locationProvider do angularjs.
* @param {Object} $futureStateProvider - $futureStateProvider do módulo 'ui-router-extras'.
*/
class RouterHelperProvider {

    constructor( $urlRouterProvider, $httpProvider, $locationProvider, $futureStateProvider ) {

        this.$get.$inject = [ '$location', '$rootScope', '$state', 'logger' ];

        $httpProvider.useApplyAsync( true );
        $locationProvider.html5Mode( false );
        $urlRouterProvider.otherwise( '/dashboard' );
        $urlRouterProvider.when( '/', '/dashboard' );
        $futureStateProvider.stateFactory( 'load', [ '$q', '$ocLazyLoad', 'futureState', stateFactory ] );

        // Registra future states como placeholder para states reais
        futureStates.forEach( ( state ) => $futureStateProvider.futureState( state ) );

        /**
        * Factory para future states do tipo "load".
        * 1) Usa Systemjs para carregar o módulo requisitado junto com suas dependências.
        * 2) Usa $ocLazyLoad para injetar o módulo obtido no angularjs. Necessário pois a configuração de rotas
        *    no angular só é possível na fase de config.
        *
        * @param {Object} $q - $q service do angularjs
        * @param {Object} $ocLazyLoad - $ocLazyLoad service do módulo 'oc.LazyLoad'
        * @param {Object} futureState - futureState representando um state na app. Em tempo de execução será substituído
                                        por um state real.
        * @returns {Promise}
        */
        function stateFactory( $q, $ocLazyLoad, futureState ) {
            return System.import( futureState.src )
                         .then( loadedModule => {
                             if ( futureState.prefetch ) {
                                 futureState.prefetch.forEach( path => System.import( path ) );
                             }
                             return $ocLazyLoad.inject( loadedModule.name || loadedModule.default.name || loadedModule );
                         } )
                         // this needs to be done so that the future state handler doesn't use the component name as state name
                         .then( () => null )
                         .catch( console.error.bind( console ) );
        }
    }


    /**
    * Método factory do provider.
    * @param {Object} $location - $location do angularjs
    * @param {Object} $rootScope - $rootScope do angular
    * @param {Object} $state - $state service do ui-router
    * @param {Object} logger - Serviço de log do Portal do Cidadão
    * @returns {Object} A instância de RouteHelper service
    */
    $get( $location, $rootScope, $state, logger ) {
        let handlingStateChangeError = false;

        let service = {
            getStates: getStates,
            configureRoutingEvents: configureRoutingEvents
        };

        return service;


        ///////////////////////////////////////////////////////////////////////////////////////////////////

        function configureRoutingEvents() {
            handleRoutingSuccess();
            handleRoutingErrors();
           //handleRoutingNotFound();
        }


//        function handleRoutingNotFound() {
//
//             $rootScope.$on('$stateNotFound', onNotFound);
//
//             function onNotFound(event, unfoundState, fromState, fromParams) {
//                 logger.warning(`Página não encontrada: ${unfoundState.to}`, [unfoundState]);
//                 event.preventDefault(); // prevent transition
//             }
//         }


        function handleRoutingSuccess() {

            $rootScope.$on( '$stateChangeSuccess', onSuccess );

            function onSuccess( event, toState, toParams, fromState, fromParams ) { //eslint-disable-line no-unused-vars
                handlingStateChangeError = false;
            }
        }


        /**
        * Configura tratamento de erros de roteamento
        */
        function handleRoutingErrors() {
            // Route cancellation:
            // On routing error, go to the dashboard.
            // Provide an exit clause if it tries to do it twice.
            $rootScope.$on( '$stateChangeError', onError );


            // Trata o erro. Provêm uma clausula de exit caso tente executar 2 vezes
            function onError( event, toState, toParams, fromState, fromParams, error ) {

                if ( handlingStateChangeError ) {
                    return;
                }

                handlingStateChangeError = true;

                let destination = ( toState &&
                    ( toState.title || toState.name || toState.loadedTemplateUrl ) ) ||
                    'destino desconhecido';

                let msg = `Erro de roteamento ao acessar ${destination}. ${error.data || ''} <br/> ${error.statusText || ''} : ${error.status || ''}`;

                logger.warning( msg, [ toState ] );

                $location.path( '/' );
            }
        }


        /**
        * Obtém a lista de states da app
        */
        function getStates() {
            return $state.get();
        }
    }
}

export default[
    '$urlRouterProvider',
    '$httpProvider',
    '$locationProvider',
    '$futureStateProvider',
    RouterHelperProvider
];

