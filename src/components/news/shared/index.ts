import newsApiService from './news-api.service';

export default angular.module( 'news.shared', [] )
  .service( 'newsApiService', newsApiService );
