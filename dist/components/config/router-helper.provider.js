'use strict';

System.register(['./states.json!', 'angular'], function (_export, _context) {
    var futureStates, angular, _createClass, RouterHelperProvider;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_statesJson) {
            futureStates = _statesJson.default;
        }, function (_angular) {
            angular = _angular.default;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            RouterHelperProvider = function () {
                function RouterHelperProvider($urlRouterProvider, $httpProvider, $locationProvider, $futureStateProvider) {
                    _classCallCheck(this, RouterHelperProvider);

                    this.$get.$inject = ['$location', '$rootScope', '$state', 'logger'];

                    $httpProvider.useApplyAsync(true);
                    $locationProvider.html5Mode(false);
                    $urlRouterProvider.otherwise('/dashboard');
                    $urlRouterProvider.when('/', '/dashboard');
                    $futureStateProvider.stateFactory('load', ['$q', '$ocLazyLoad', 'futureState', stateFactory]);

                    futureStates.forEach(function (state) {
                        return $futureStateProvider.futureState(state);
                    });

                    function stateFactory($q, $ocLazyLoad, futureState) {
                        return System.import(futureState.src).then(function (loadedModule) {
                            if (futureState.prefetch) {
                                futureState.prefetch.forEach(function (path) {
                                    return System.import(path);
                                });
                            }
                            return $ocLazyLoad.inject(loadedModule.name || loadedModule.default.name || loadedModule);
                        }).then(function () {
                            return null;
                        }).catch(console.error.bind(console));
                    }
                }

                _createClass(RouterHelperProvider, [{
                    key: '$get',
                    value: function $get($location, $rootScope, $state, logger) {
                        var handlingStateChangeError = false;

                        var service = {
                            getStates: getStates,
                            configureRoutingEvents: configureRoutingEvents
                        };

                        return service;

                        function configureRoutingEvents() {
                            handleRoutingSuccess();
                            handleRoutingErrors();
                        }

                        function handleRoutingSuccess() {

                            $rootScope.$on('$stateChangeSuccess', onSuccess);

                            function onSuccess(event, toState, toParams, fromState, fromParams) {
                                handlingStateChangeError = false;
                            }
                        }

                        function handleRoutingErrors() {
                            $rootScope.$on('$stateChangeError', onError);

                            function onError(event, toState, toParams, fromState, fromParams, error) {

                                if (handlingStateChangeError) {
                                    return;
                                }

                                handlingStateChangeError = true;

                                var destination = toState && (toState.title || toState.name || toState.loadedTemplateUrl) || 'destino desconhecido';

                                var msg = 'Erro de roteamento ao acessar ' + destination + '. ' + (error.data || '') + ' <br/>\n                                            ' + (error.statusText || '') + ' : ' + (error.status || '');

                                logger.warning(msg, [toState]);

                                $location.path('/');
                            }
                        }

                        function getStates() {
                            return $state.get();
                        }
                    }
                }]);

                return RouterHelperProvider;
            }();

            _export('default', ['$urlRouterProvider', '$httpProvider', '$locationProvider', '$futureStateProvider', RouterHelperProvider]);
        }
    };
});