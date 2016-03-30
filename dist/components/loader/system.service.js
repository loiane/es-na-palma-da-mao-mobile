"use strict";

System.register([], function (_export, _context) {
    var _createClass, SystemService;

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

            SystemService = function () {
                function SystemService($log) {
                    _classCallCheck(this, SystemService);

                    this.$log = $log;
                }

                _createClass(SystemService, [{
                    key: "import",
                    value: function _import(path) {
                        var _this = this;

                        return System.import(path).catch(function (err) {
                            return _this.$log.error(err.stack);
                        });
                    }
                }]);

                return SystemService;
            }();

            _export("default", [SystemService]);
        }
    };
});