import NewsApiService from '../shared/news-api.service';

class NewsDetailController {

    private news = [];

    /**
     * @constructor
     *
     * @param $scope
     * @param newsApiService
     * @param $ionicLoading
     * @param $stateParams
     */
    constructor( private $scope,
                 private newsApiService:NewsApiService,
                 private $ionicLoading,
                 private $stateParams ) {
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }

    /**
     * Ativa o controller
     *
     * @returns {void}
     */
    activate() {
        this.getNewsById( this.$stateParams.id );
    }

    /**
     *
     * @param id
     */
    getNewsById( id ) {
        this.$ionicLoading.show( 200 );
        this.newsApiService.getNewsById( id )
            .then( news => this.news = news )
            .finally( () => {
                this.$ionicLoading.hide();
            } );
    }
}

NewsDetailController.$inject = ['$scope', 'newsApiService', '$ionicLoading', '$stateParams'];

export default NewsDetailController;
