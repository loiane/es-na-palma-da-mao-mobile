import { IScope, IPromise } from 'angular';

import { SourcesFilterController, sourcesFilterTemplate }  from '../../layout/sources-filter/index';
import datesFilterTemplate from './dates-filter/dates-filter.html';
import { DatesFilterController } from './dates-filter/dates-filter.controller';
import { News, NewsApiService, Filter, Pagination } from '../shared/index';
import { TransitionService } from '../../shared/index';

export class NewsListController {

    public static $inject: string[] = [
        '$scope',
        '$mdDialog',
        'newsApiService',
        'transitionService'
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
     * @param {angular.material.IDialogService} $mdDialog
     * @param {NewsApiService} newsApiService
     * @param {TransitionService} transitionService
     */
    constructor( private $scope: IScope,
        private $mdDialog: angular.material.IDialogService,
        private newsApiService: NewsApiService,
        private transitionService: TransitionService ) {
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }

    /**
     * Ativa o controller
     */
    public activate(): void {
        this.getAvailableOrigins();
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
            })
            .finally(() => {
                this.$scope.$broadcast( 'scroll.infiniteScrollComplete' );
            });
    }

    /**
     * 
     * 
     * @returns {IPromise<News[]>}
     * 
     * @memberOf NewsListController
     */
    public loadOrPaginate(): IPromise<News[]> {
        // só página se já existe alguma notícia carregada
        if ( this.news.length ) {
            this.pagination.pageNumber += 1;
        }
        return this.getNews( this.filter, this.pagination );
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
        this.transitionService.changeState( 'app.news/:id', { id: id }, { type: 'slide', direction: 'right' });
    }
}
