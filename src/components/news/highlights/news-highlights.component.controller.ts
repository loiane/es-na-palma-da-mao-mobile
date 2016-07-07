import NewsApiService from '../shared/news-api.service';

class NewsHighlightsController {

    private highlights = [];

    /**
     * @constructor
     *
     * @param $scope
     * @param newsApiService
     * @param $ionicLoading
     * @param $state
     */
    constructor( private $scope,
                 private newsApiService:NewsApiService,
                 private $ionicLoading,
                 private $state ) {

        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }

    /**
     * Ativa o controller
     *
     * @returns {void}
     */
    activate() {
        this.getHighlightNews();
    }

    /**
     *
     * @returns {*|{}}
     */
    get firstNews() {
        return this.highlights[0];
    }

    /**
     *
     * @returns {*}
     */
    get otherNews() {
        return this.highlights.length > 0 ? this.highlights.slice( 1 ) : [];
    }

    /**
     *
     */
    getHighlightNews() {
        this.$ionicLoading.show( 200 );
        this.newsApiService.getHighlightNews()
            .then( highlights => this.highlights = highlights )
            .finally( () => {
                this.$ionicLoading.hide();
            } );
    }

    /**
     *
     * @param id
     */
    goToNews( id ) {
        this.$state.go( 'app.news/:id', {id: id} );
    }
}

NewsHighlightsController.$inject = ['$scope', 'newsApiService', '$ionicLoading', '$state'];

export default NewsHighlightsController;


