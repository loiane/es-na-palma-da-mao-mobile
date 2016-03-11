import futureStates from './states.json!';

/**
* Aplica configurações de roteamento à aplicação. Usa "FutureStates" para
* configurar rotas de uma fonte externa(como um JSON ou DB) em runtime, uma vez que
* UI-Router expõe $stateProvider à aplicação somente na fase de config, e não em runtime. 
*
* Ref: https://christopherthielen.github.io/ui-router-extras/#/future
*
* @param {Object} $stateProvider - $stateProvider do módulo 'ui-router' .
* @param {Object} $urlRouterProvider - $urlRouterProvider do angularjs.
* @param {Object} $httpProvider - $httpProvider do angularjs.
* @param {Object} $locationProvider - $locationProvider do angularjs.
* @param {Object} $futureStateProvider - $futureStateProvider do módulo 'ui-router-extras'.
*/
function routingConfig($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, $futureStateProvider) {
    'ngInject';

    $httpProvider.useApplyAsync(true);
    $locationProvider.html5Mode(false);

    $urlRouterProvider.otherwise('/dashboard');
    $urlRouterProvider.when('/', '/dashboard');
    $futureStateProvider.stateFactory('load', ['$q', '$ocLazyLoad', 'futureState', stateFactory]);
 

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
    function stateFactory($q, $ocLazyLoad, futureState) {
        return System.import(futureState.src)
                     .then(loadedModule => { 
                        if (futureState.prefetch) {
                            futureState.prefetch.forEach(path => System.import(path));
                        }
                        return $ocLazyLoad.inject(loadedModule.name || loadedModule.default.name || loadedModule);
                     })
                     // this needs to be done so that the future state handler doesn't use the component name as state name
                     .then(() => null)
                     .catch(console.error.bind(console));
    }

 
    // Registra future states como placeholder para states reais
    futureStates.forEach((state) => $futureStateProvider.futureState(state));
}


export default[
    '$stateProvider',
    '$urlRouterProvider',
    '$httpProvider',
    '$locationProvider',
    '$futureStateProvider',
    routingConfig
];

              