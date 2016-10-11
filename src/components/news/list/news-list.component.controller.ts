import { IScope, IPromise } from 'angular';

import sourcesFilterTemplate from './sources-filter/sources-filter.html';
import datesFilterTemplate from './dates-filter/dates-filter.html';
import { SourcesFilterController } from './sources-filter/sources-filter.controller';
import { DatesFilterController } from './dates-filter/dates-filter.controller';
import { News, NewsApiService, Filter, Pagination } from '../shared/index';

export class NewsListController {

    public static $inject: string[] = [
        '$scope',
        '$state',
        '$mdDialog',
        '$timeout',
        '$ionicScrollDelegate',
        'newsApiService'
    ];
    private isPaginating = false;
    private isRefreshing = false;
    public availableOrigins: string[] | undefined;
    public news: News[] = [];
    public hasMoreNews = true;
    public filter: Filter = {};
    public pagination: Pagination = {
        pageNumber: 1,
        pageSize: 10
    };


    /**
     * Creates an instance of NewsListController.
     * 
     * @param {IScope} $scope
     * @param {angular.ui.IStateService} $state
     * @param {angular.material.IDialogService} $mdDialog
     * @param {NewsApiService} newsApiService
     */
    constructor( private $scope: IScope,
        private $state: angular.ui.IStateService,
        private $mdDialog: angular.material.IDialogService,
        private $timeout: any,
        private $ionicScrollDelegate: any,
        private newsApiService: NewsApiService ) {

        this.$scope.$on( 'logout', () => this.reset() );
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }

    /**
     * Ativa o controller
     */
    public activate(): void {
        if ( !this.activated ) {
             console.log( 'activate()' );
            this.getAvailableOrigins()
                .then(() => this.getFirstPage() );
        }
    }

    /**
     * 
     * 
     * @readonly
     * @type {boolean}
     * @memberOf NewsListController
     */
    public get activated(): boolean {
        return !!this.availableOrigins && this.news.length > 0;
    }

    /**
     * 
     * 
     * 
     * @memberOf NewsListController
     */
    public reset(): void {
        this.availableOrigins = undefined;
        this.news = [];
        this.hasMoreNews = true;
        this.filter = {};
        this.pagination = {
            pageNumber: 1,
            pageSize: 10
        };
    }

    /**
     * Carrega lista de origins disponíveis
     *
     * @returns {*}
     */
    public getAvailableOrigins(): IPromise<string[]> {
        return this.newsApiService.getAvailableOrigins()
            .then( origins => {
                this.availableOrigins = origins || [];
                this.filter.origins = this.filter.origins || angular.copy( this.availableOrigins );
                return origins;
            });
    }

    /**
     * Obtém uma lista de notícias
     */
    private getNews( filter: Filter, pagination: Pagination ): IPromise<News[]> {
         console.log( 'getNews()' );
        return this.newsApiService.getNews( filter, pagination )
            .then( nextNews => {
                // Check whether it has reached the end
                this.hasMoreNews = nextNews.length >= this.pagination.pageSize;
                this.news = this.isFirstPage ? nextNews : this.news.concat( nextNews );

                // notify ion-content to resize after inner height has changed.
                // so that it will trigger infinite scroll again if needed.
                this.$timeout(() => {
                    this.$ionicScrollDelegate.$getByHandle( 'mainScroll' ).resize();
                });

                // increment page for the next query
                this.pagination.pageNumber += 1;

                return nextNews;
            });
    }

    /**
     * 
     * 
     * 
     * @memberOf NewsListController
     */
    public doRefresh() {
        console.log( 'doRefresh()' );
        this.isRefreshing = true;
        this.getAvailableOrigins()
            .then(() => this.getFirstPage() )
            .then(() => {
                this.isRefreshing = false;
                this.$scope.$broadcast( 'scroll.refreshComplete' );
            });
    }

    /**
     * 
     * 
     * 
     * @memberOf NewsListController
     */
    public doPaginate(): IPromise<News[]> {
        console.log( 'doPaginate()' );
        this.isPaginating = true;
        return this.getNews( this.filter, this.pagination )
            .then( nextNews => {
                this.isPaginating = false;
                this.$scope.$broadcast( 'scroll.infiniteScrollComplete' );
                return nextNews;
            });
    }

    /**
     * 
     * 
     * @param {any} filter
     * 
     * @memberOf NewsListController
     */
    public doFilter( filter ): IPromise<News[]> {
        console.log( 'doFilter()' );
        angular.extend( this.filter, filter );
        return this.getFirstPage();
    }

    /**
    * 
    * 
    * @returns {IPromise<News[]>}
    * 
    * @memberOf NewsListController
    */
    private getFirstPage(): IPromise<News[]> {
        this.hasMoreNews = true;
        this.pagination.pageNumber = 1;
        return this.getNews( this.filter, this.pagination );
    }

    /**
     * 
     * 
     * @readonly
     * 
     * @memberOf NewsListController
     */
    public get isFirstPage() {
        return this.pagination.pageNumber === 1;
    }

    /**
     * Abre filtro(popup) por fonte da notícia
     */
    public openOriginsFilter(): void {
        this.$mdDialog.show( {
            controller: SourcesFilterController,
            template: sourcesFilterTemplate,
            bindToController: true,
            controllerAs: 'vm',
            locals: {
                availableOrigins: this.availableOrigins,
                selectedOrigins: this.filter.origins
            }
        })
            .then( filter => this.doFilter( filter ) );
    }

    /**
     * Abre o filtro (popup) por data
     */
    public openDateFilter(): void {
        this.$mdDialog.show( {
            controller: DatesFilterController,
            template: datesFilterTemplate,
            bindToController: true,
            controllerAs: 'vm',
            locals: {
                dateMin: this.filter.dateMin,
                dateMax: this.filter.dateMax
            }
        })
            .then( filter => this.doFilter( filter ) );
    }



    /**
     * Navega para um notícia
     * 
     * @param {string} id
     */
    public goToNews( id: string ): void {
        this.$state.go( 'app.news/:id', { id: id });
    }
}
