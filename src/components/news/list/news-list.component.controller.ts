import {IScope} from 'angular';
import {loading, scroll} from 'ionic';
import {IStateService} from 'angular-ui-router';

import sourcesDialogTemplate from './sources-dialog/sources-dialog.html';
import datesDialogTemplate from './dates-dialog/dates-dialog.html';
import SourcesDialogController from './sources-dialog/sources-dialog.controller';
import DatesDialogController from './dates-dialog/dates-dialog.controller';
import NewsApiService from '../shared/news-api.service';

interface NewsFilter {
    origins?:string[],
    dateMin?:Date,
    dateMax?:Date,
    pageNumber?:number
}

class NewsListController {

    static $inject:string[] = [
        '$scope',
        '$state',
        '$mdDialog',
        '$ionicLoading',
        'newsApiService',
        '$ionicScrollDelegate'
    ];

    private availableOrigins = [];
    private news = [];
    private activated:boolean = false;
    private populated = false;
    private hasMoreNews = true;
    private currentPage = 0;
    private filter:NewsFilter = {
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
    constructor( private $scope:IScope,
                 private $state:IStateService,
                 private $mdDialog:angular.material.IDialogService,
                 private $ionicLoading:loading.IonicLoadingService,
                 private newsApiService:NewsApiService,
                 private $ionicScrollDelegate:scroll.IonicScrollDelegate ) {
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
        this.resetPagination();
    }

    /**
     *
     */
    public activate():void {
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
    public getAvailableOrigins() {
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
    public getNews( options:NewsFilter = {} ):void {

        angular.extend( this.filter, options ); // atualiza o filtro

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
    public openOriginsFilter():void {
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
    public openDateFilter():void {
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
    public reload( filter ):void {
        this.resetPagination();
        filter.pageNumber = 1;
        this.getNews( filter );
    }

    /**
     *
     */
    public resetPagination():void {
        this.news = [];
        this.populated = false;
        this.hasMoreNews = true;
        this.currentPage = 0;
    }

    /**
     *
     * @param id
     */
    public goToNews( id:string ):void {
        this.$state.go( 'app.news/:id', { id: id } );
    }
}

export default NewsListController;
