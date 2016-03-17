'use strict';

System.register(['angular-ui-router', './diversos.css!', 'angular', './diversos.controller', './diversos.routes'], function (_export, _context) {
                      var angular, DiversosController, diversosRoutes, dependencies;
                      return {
                                            setters: [function (_angularUiRouter) {}, function (_diversosCss) {}, function (_angular) {
                                                                  angular = _angular.default;
                                            }, function (_diversosController) {
                                                                  DiversosController = _diversosController.default;
                                            }, function (_diversosRoutes) {
                                                                  diversosRoutes = _diversosRoutes.default;
                                            }],
                                            execute: function () {
                                                                  dependencies = ['ui.router'];

                                                                  _export('default', angular.module('app', dependencies).controller('DiversosController', DiversosController).config(diversosRoutes));
                                            }
                      };
});