import { DioApiService } from './dio-api.service';

export default angular.module( 'dio.shared', [] )
                      .service( 'dioApiService', DioApiService );