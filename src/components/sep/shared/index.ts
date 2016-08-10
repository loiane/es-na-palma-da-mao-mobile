import { SepApiService } from './sep-api.service';

export default angular.module( 'sep.shared', [] )
                      .service( 'sepApiService', SepApiService );


export * from './models/index';
export * from './sep-api.service';
