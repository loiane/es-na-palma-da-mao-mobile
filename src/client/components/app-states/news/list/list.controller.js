import sourcesDialogTemplate from './sources-dialog/sources-dialog.tpl.html!text';
import SourcesDialogController from './sources-dialog/sources-dialog.controller';
import datesDialogTemplate from './dates-dialog/dates-dialog.tpl.html!text';
import DatesDialogController from './dates-dialog/dates-dialog.controller';

class ListController {

    /**
     * @constructor
     *
     * @param $state
     * @param $mdDialog
     * @param $ionicLoading
     * @param newsApiService
     */
    constructor( $scope, $state, $mdDialog, $ionicLoading, newsApiService, $ionicScrollDelegate ) {
        this.$state = $state;
        this.$scope = $scope;
        this.newsApiService = newsApiService;
        this.$mdDialog = $mdDialog;
        this.$ionicLoading = $ionicLoading;
        this.availableOrigins = [];
        this.selectedOrigins = [];
        this.activated = false;
        this.filter = {
            origins: [],
            dateMin: undefined,
            dateMax: undefined,
            pageNumber: 1
        };

        this.$ionicScrollDelegate = $ionicScrollDelegate;

        this.activate();
    }

    /**
     *
     */
    activate() {
        this.resetPagination();
        this.getAvailableOrigins()
            .finally( () => {
                this.activated = true;
            } );
    }

    /**
     * Carrega lista de origins disponíveis
     *
     * @returns {*}
     */
    getAvailableOrigins() {
        return this.newsApiService.getAvailableOrigins()
                   .then( origins => {
                       this.availableOrigins = origins;
                       this.filter.origins = angular.copy( this.availableOrigins );
                       return origins;
                   } );
    }

    /**
     *
     */
    getNews( options ) {

        angular.extend( this.filter, options || {} ); // atualiza o filtro

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
            } );
    }

    /**
     *
     * @param $event
     */
    openOriginsFilter( $event ) {
        this.$mdDialog.show( {
            controller: SourcesDialogController,
            template: sourcesDialogTemplate,
            targetEvent: $event,
            bindToController: true,
            controllerAs: 'vm',
            locals: {
                availableOrigins: this.availableOrigins,
                selectedOrigins: this.filter.origins
            }
        } )
            .then( filter => this.reload( filter ) );
    }

    /**
     *
     * @param $event
     */
    openDateFilter( $event ) {
        this.$mdDialog.show( {
            controller: DatesDialogController,
            template: datesDialogTemplate,
            targetEvent: $event,
            bindToController: true,
            controllerAs: 'vm',
            locals: {
                dateMin: this.filter.dateMin,
                dateMax: this.filter.dateMax
            }
        } )
            .then( filter => {
                this.reload( filter );
            } );
    }

    /**
     *
     */
    reload( filter ) {
        this.resetPagination();
        filter.pageNumber = 1;
        this.getNews( filter );
    }

    /**
     *
     */
    resetPagination() {
        this.news = [];
        this.populated = false;
        this.hasMoreNews = true;
        this.currentPage = 0;
    }

    /**
     *
     * @param id
     */
    goToNews( id ) {
        this.$state.go( 'app.news/:id', { id: id } );
    }
}

export default
[
    '$scope',
    '$state',
    '$mdDialog',
    '$ionicLoading',
    'newsApiService',
    '$ionicScrollDelegate',
    ListController
]
;
