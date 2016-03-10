import futureStates from './states.json!';


function routingConfig($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, $futureStateProvider) {
    'ngInject';

    $httpProvider.useApplyAsync(true);
    $locationProvider.html5Mode(false);

    $urlRouterProvider.otherwise('/dashboard');
    $urlRouterProvider.when('/', '/dashboard');
    $futureStateProvider.stateFactory('load', ['$q', '$ocLazyLoad', 'futureState', stateFactory]);
 


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
              