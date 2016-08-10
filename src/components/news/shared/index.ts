import { NewsApiService } from './news-api.service';

export default angular.module( 'news.shared', [] )
                      .service( 'newsApiService', NewsApiService );

export * from './news-api.service';
export * from './models/index';