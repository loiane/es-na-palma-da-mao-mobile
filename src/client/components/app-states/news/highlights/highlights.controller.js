class HighlightsController {

    /**
     *
     * @param newsApiService
     * @param $ionicLoading
     * @param $state
     */
    constructor( newsApiService, $ionicLoading, $state ) {
        this.$state = $state;
        this.newsApiService = newsApiService;
        this.$ionicLoading = $ionicLoading;
        this.highlights = [];

        this.activate();
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
        return this.highlights[ 0 ] || {};
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
        this.$state.go( 'app.news/:id', { id: id } );
    }
}

export default [ 'newsApiService', '$ionicLoading', '$state', HighlightsController ];


