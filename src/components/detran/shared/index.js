import detranApiService from './detran-api.service.js';

export default angular.module( 'detran.shared', [] )
                      .service( 'detranApiService', detranApiService );
