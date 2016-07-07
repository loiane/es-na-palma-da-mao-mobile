import sourcesDialogTemplate from './sources-dialog/sources-dialog.tpl.html';
import SourcesDialogController from './sources-dialog/sources-dialog.controller';
import datesDialogTemplate from './dates-dialog/dates-dialog.tpl.html';
import DatesDialogController from './dates-dialog/dates-dialog.controller';
import NewsApiService from '../shared/news-api.service';

class NewsListController {

    private availableOrigins = [];
    private news = [];
    private activated:boolean = false;
    private populated = false;
    private hasMoreNews = true;
    private currentPage = 0;
    private filter = {
        origins: [],
        dateMin: undefined,
        dateMax: undefined,
        pageNumber: 1
    };

    /**
     * @constructor
     *
     * @param $scope
     * @param $state
     * @param $mdDialog
     * @param $ionicLoading
     * @param newsApiService
     * @param $ionicScrollDelegate
     */
    constructor( private $scope,
                 private $state,
                 private $mdDialog,
                 private $ionicLoading,
                 private newsApiService:NewsApiService,
                 private $ionicScrollDelegate ) {

        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
        this.resetPagination();
    }

    /**
     *
     */
    activate() {
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
     */
    openOriginsFilter() {
        this.$mdDialog.show( {
            controller: SourcesDialogController,
            template: sourcesDialogTemplate,
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
     */
    openDateFilter() {
        this.$mdDialog.show( {
            controller: DatesDialogController,
            template: datesDialogTemplate,
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
        this.$state.go( 'app.news/:id', {id: id} );
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
    NewsListController
];
