'use strict';

System.register([], function (_export, _context) {
    var _createClass, AppController;

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

            AppController = function () {
                AppController.$inject = ["logger"];
                function AppController(logger) {
                    'ngInject';

                    _classCallCheck(this, AppController);

                    this.activate();
                    logger.info('Aplicação inicializada');
                }

                _createClass(AppController, [{
                    key: 'activate',
                    value: function activate() {
                        this.showFooter = true;
                        this.showHeader = true;
                        this.showSideBar = true;
                        this.showFooterControls = true;
                        this.showUserInfo = true;
                        this.userName = 'Daniel Hoisel';
                        this.appName = 'Portal do Cidadão';
                    }
                }]);

                return AppController;
            }();

            _export('default', ['logger', AppController]);
        }
    };
});