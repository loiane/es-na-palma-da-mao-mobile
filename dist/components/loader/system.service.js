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
                function SystemService() {
                    _classCallCheck(this, SystemService);
                }

                _createClass(SystemService, [{
                    key: "import",
                    value: function _import(path) {
                        return System.import(path).catch(function (err) {
                            console.error(err.stack);
                        });
                    }
                }]);

                return SystemService;
            }();

            _export("default", [SystemService]);
        }
    };
});