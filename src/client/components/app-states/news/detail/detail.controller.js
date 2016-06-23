class DetailController {

    /**
     * @constructor
     *
     * @param newsApiService
     * @param $ionicLoading
     * @param $stateParams
     */
    constructor( $scope, newsApiService, $ionicLoading, $stateParams ) {
        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.newsApiService = newsApiService;
        this.$ionicLoading = $ionicLoading;

        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate( ) );
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

export default [
    '$scope', 'newsApiService', '$ionicLoading', '$stateParams', DetailController
];


