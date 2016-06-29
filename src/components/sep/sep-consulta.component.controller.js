class SepConsultaController {

    /**
     * @constructor
     *
     * @param $state
     * @param $mdDialog
     * @param $ionicLoading
     * @param newsApiService
     */
    constructor( $scope, $state, $mdDialog, $ionicLoading, sepApiService ) {
        this.$state = $state;
        this.$scope = $scope;
        this.sepApiService = sepApiService;
        this.$mdDialog = $mdDialog;
        this.$ionicLoading = $ionicLoading;
        this.activated = false;

        this.processes = [];

        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }

    /**
     *
     */
    activate() {
/*        this.getAvailableOrigins()
            .finally( () => {
                this.activated = true;
            } );*/
    }

    /**
     *
     */
    getProcesses( options ) {

        /*angular.extend( this.filter, options || {} ); // atualiza o filtro

        if ( this.filter.pageNumber ) {
            this.currentPage = this.filter.pageNumber;
        }

        this.newsApiService.getNews( this.filter )
            .then( nextNews => {
                this.news = this.news.concat( nextNews );

                if ( !nextNews.length ) {
                    this.hasMoreNews = false;
                }

                this.populated = true;
            } )
            .finally( () => {
                this.$scope.$broadcast( 'scroll.infiniteScrollComplete' );
            } );*/
    }

    /**
     *
     * @param id
     */
    goToProcess( id ) {
        this.$state.go( 'app.news/:id', { id: id } );
    }
}

export default
    [
        '$scope',
        '$state',
        '$mdDialog',
        '$ionicLoading',
        'sepApiService',
        SepConsultaController
    ];
