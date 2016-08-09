import { DioApiService } from './dio-api.service';

export * from './dio-api.service';
export * from './models/index'

export default angular.module( 'dio.shared', [] )
                      .service( 'dioApiService', DioApiService );