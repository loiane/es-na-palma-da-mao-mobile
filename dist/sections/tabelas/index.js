'use strict';

System.register(['angular-ui-router', './tabelas.css!', 'angular', './tabelas.controller', './tabelas.routes'], function (_export, _context) {
                      var angular, TabelasController, tabelasRoutes, dependencies;
                      return {
                                            setters: [function (_angularUiRouter) {}, function (_tabelasCss) {}, function (_angular) {
                                                                  angular = _angular.default;
                                            }, function (_tabelasController) {
                                                                  TabelasController = _tabelasController.default;
                                            }, function (_tabelasRoutes) {
                                                                  tabelasRoutes = _tabelasRoutes.default;
                                            }],
                                            execute: function () {
                                                                  dependencies = ['ui.router'];

                                                                  _export('default', angular.module('tabelas-state', dependencies).controller('tabelasController', TabelasController).config(tabelasRoutes));
                                            }
                      };
});