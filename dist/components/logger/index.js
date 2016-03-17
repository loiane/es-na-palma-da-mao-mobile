'use strict';

System.register(['./logger.service.js'], function (_export, _context) {
                      var logger;
                      return {
                                            setters: [function (_loggerServiceJs) {
                                                                  logger = _loggerServiceJs.default;
                                            }],
                                            execute: function () {
                                                                  _export('default', angular.module('logger', []).factory('logger', logger));
                                            }
                      };
});