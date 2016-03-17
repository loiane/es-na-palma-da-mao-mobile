import logger from './logger.service.js';

export default angular.module('logger', [])
                      .factory('logger', logger);   