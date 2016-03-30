'use strict';

System.register(['angular-ui-router', './dashboard.css!', 'angular', './dashboard.controller', './dashboard.routes'], function (_export, _context) {
                      var angular, DashBoardController, dashBoardRoutes, dependencies;
                      return {
                                            setters: [function (_angularUiRouter) {}, function (_dashboardCss) {}, function (_angular) {
                                                                  angular = _angular.default;
                                            }, function (_dashboardController) {
                                                                  DashBoardController = _dashboardController.default;
                                            }, function (_dashboardRoutes) {
                                                                  dashBoardRoutes = _dashboardRoutes.default;
                                            }],
                                            execute: function () {
                                                                  dependencies = ['ui.router'];

                                                                  _export('default', angular.module('dashBoard-state', dependencies).controller('dashBoardController', DashBoardController).config(dashBoardRoutes));
                                            }
                      };
});