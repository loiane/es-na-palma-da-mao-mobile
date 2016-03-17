'use strict';

System.register(['angular', 'oclazyload', './component-loader.service', './system.service', './directive-loader.directive.js'], function (_export, _context) {
                      var angular, ocLazyLoad, ComponentLoaderService, SystemService, DirectiveLoader;
                      return {
                                            setters: [function (_angular) {
                                                                  angular = _angular.default;
                                            }, function (_oclazyload) {
                                                                  ocLazyLoad = _oclazyload.default;
                                            }, function (_componentLoaderService) {
                                                                  ComponentLoaderService = _componentLoaderService.default;
                                            }, function (_systemService) {
                                                                  SystemService = _systemService.default;
                                            }, function (_directiveLoaderDirectiveJs) {
                                                                  DirectiveLoader = _directiveLoaderDirectiveJs.default;
                                            }],
                                            execute: function () {
                                                                  _export('default', angular.module('angular-lazy', [ocLazyLoad]).service('componentLoader', ComponentLoaderService).service('system', SystemService).directive('pdcDirectiveLoader', DirectiveLoader));
                                            }
                      };
});