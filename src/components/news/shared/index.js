import newsApiService from './news-api.service.js';

export default angular.module( 'news.shared', [] )
                      .service( 'newsApiService', newsApiService );
