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
        'newsApiService'
    ];

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
        private newsApiService: NewsApiService ) {

        this.$scope.$on( 'logout', () => this.reset() );
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }

    /**
     * Ativa o controller
     */
    public activate( force: boolean = false ): void {
        if ( !this.activated || force ) {
            this.reset();
            this.getAvailableOrigins()
                .then(() => this.getNews( this.filter, this.pagination ) )
                // .then(() => this.activated = true )
                .finally(() => {
                    if ( force ) {
                        this.$scope.$broadcast( 'scroll.refreshComplete' );
                         this.$scope.$broadcast( 'scroll.infiniteScrollComplete' );
                    }
                });
        }
    }

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
                this.filter.origins = angular.copy( this.availableOrigins );
                return origins;
            });
    }

    /**
     * Obtém uma lista de notícias
     */
    public getNews( filter: Filter, pagination: Pagination ): IPromise<News[]> {
        return this.newsApiService.getNews( filter, pagination )
            .then( nextNews => {
                this.news = this.isPaginating ? this.news.concat( nextNews ) : nextNews;
                this.hasMoreNews = ( nextNews.length === pagination.pageSize );
                return nextNews;
            });
    }

    /**
     * 
     * 
     * @returns {IPromise<News[]>}
     * 
     * @memberOf NewsListController
     */
    public paginate() {
        // só página se já existe alguma notícia carregada
        if ( this.news.length ) {
            console.log( 'paginando' );
            this.pagination.pageNumber += 1;
            this.getNews( this.filter, this.pagination ).finally(() => {
                this.$scope.$broadcast( 'scroll.infiniteScrollComplete' );
            });
        }
    }

    /**
     * 
     * 
     * @readonly
     * 
     * @memberOf NewsListController
     */
    public get isPaginating() {
        return this.pagination.pageNumber > 1;
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
            .then( filter => this.applyUserFilter( filter ) );
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
            .then( filter => this.applyUserFilter( filter ) );
    }

    /**
     * Recarrega a página
     */
    public applyUserFilter( filter ): void {
        this.hasMoreNews = true;
        this.pagination.pageNumber = 1;
        angular.extend( this.filter, filter );
        this.getNews( this.filter, this.pagination );
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
