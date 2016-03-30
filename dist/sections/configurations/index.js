'use strict';

System.register(['angular-ui-router', 'angular', './configurations.css!', './configurations.controller', './configurations.routes'], function (_export, _context) {
                      var angular, ConfigurationsController, configurationsRoutes, dependencies;
                      return {
                                            setters: [function (_angularUiRouter) {}, function (_angular) {
                                                                  angular = _angular.default;
                                            }, function (_configurationsCss) {}, function (_configurationsController) {
                                                                  ConfigurationsController = _configurationsController.default;
                                            }, function (_configurationsRoutes) {
                                                                  configurationsRoutes = _configurationsRoutes.default;
                                            }],
                                            execute: function () {
                                                                  dependencies = ['ui.router'];

                                                                  _export('default', angular.module('configurations-state', dependencies).controller('configurationsController', ConfigurationsController).config(configurationsRoutes));
                                            }
                      };
});