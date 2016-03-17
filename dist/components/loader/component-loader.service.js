'use strict';

System.register([], function (_export, _context) {
    var _createClass, ComponentLoaderService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
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

            ComponentLoaderService = function () {
                function ComponentLoaderService($q, $ocLazyLoad, system) {
                    _classCallCheck(this, ComponentLoaderService);

                    this._$q = $q;
                    this._$ocLazyLoad = $ocLazyLoad;
                    this._system = system;
                }

                _createClass(ComponentLoaderService, [{
                    key: 'loadComponent',
                    value: function loadComponent(componentName) {
                        var _this = this;

                        if (!this._$ocLazyLoad.isLoaded(componentName)) {
                            return this._system.import('dist/components/layout/' + componentName + '/index').then(function (loadedComponent) {
                                var componentName = loadedComponent.name || loadedComponent.default.name || loadedComponent;
                                return _this._$ocLazyLoad.inject(componentName);
                            });
                        }

                        return this._$q.when(componentName);
                    }
                }]);

                return ComponentLoaderService;
            }();

            _export('default', ['$q', '$ocLazyLoad', 'system', ComponentLoaderService]);
        }
    };
});