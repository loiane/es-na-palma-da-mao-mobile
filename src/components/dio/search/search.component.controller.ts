import { IScope, IPromise, IWindowService } from 'angular';
import { IStateService } from 'angular-ui-router';

// import sourcesDialogTemplate from './sources-dialog/sources-dialog.html';
// import datesDialogTemplate from './dates-dialog/dates-dialog.html';
// import SourcesDialogController from './sources-dialog/sources-dialog.controller';
// import DatesDialogController from './dates-dialog/dates-dialog.controller';
import { DioApiService } from '../shared/dio-api.service';
import { SearchResult, Edition } from '../shared/models/index';

// interface Filter {
//     origins?: string[];
//     dateMin?: Date;
//     dateMax?: Date;
//     pageNumber?: number;
// }

export class SearchController {

    public static $inject: string[] = [
        '$scope',
        '$state',
        '$window',
        '$mdDialog',
        '$ionicLoading',
        'dioApiService',
        '$ionicScrollDelegate'
    ];

    private latestEditions: string[] = [];
    // private news: News[] = [];
    private activated = false;
    // private populated = false;
    // private hasMoreNews = true;
    // private currentPage = 0;
    // private filter: Filter = {
    //     origins: [],
    //     dateMin: undefined,
    //     dateMax: undefined,
    //     pageNumber: 1
    // };


    /**
     * Creates an instance of DioListController.
     * 
     * @param {IScope} $scope
     * @param {IStateService} $state
     * @param {angular.material.IDialogService} $mdDialog
     * @param {ionic.loading.IonicLoadingService} $ionicLoading
     * @param {DioApiService} dioApiService
     * @param {ionic.scroll.IonicScrollDelegate} $ionicScrollDelegate
     */
    constructor( private $scope: IScope,
        private $state: IStateService,
        private $window: IWindowService,
        private $mdDialog: angular.material.IDialogService,
        private $ionicLoading: ionic.loading.IonicLoadingService,
        private dioApiService: DioApiService,
        private $ionicScrollDelegate: ionic.scroll.IonicScrollDelegate ) {
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }

    /**
     * Ativa o controller
     */
    public activate(): void {
        this.getLatestEditions()
            .finally( () => {
                this.activated = true;
            } );
    }

    /**
     * Carrega lista de origins disponíveis
     *
     * @returns {*}
     */
    public getLatestEditions(): IPromise<Edition[]> {
        return this.dioApiService.getLatestEditions()
            .then( editions => {
                this.latestEditions = editions;
                return editions;
            });
    }

    /**
     * 
     * 
     * @param {string} url
     */
    public openEdition( url: string ): void {
        this.$window.open( url, '_system' );
    }


    // /**
    //  * Obtém uma lista de notícias
    //  */
    // public getNews( options: Filter = {} ): void {

    //     angular.extend( this.filter, options ); // atualiza o filtro

    //     if ( this.filter.pageNumber ) {
    //         this.currentPage = this.filter.pageNumber;
    //     }

    //     this.dioApiService.getNews( this.filter )
    //         .then( nextNews => {
    //             this.news = this.news.concat( nextNews );

    //             if ( !nextNews.length ) {
    //                 this.hasMoreNews = false;
    //             }

    //             this.populated = true;
    //         } )
    //         .finally( () => {
    //             this.$scope.$broadcast( 'scroll.infiniteScrollComplete' );
    //         } );
    // }

    // /**
    //  * Abre filtro(popup) por fonte da notícia
    //  */
    // public openOriginsFilter(): void {
    //     this.$mdDialog.show( {
    //         controller: SourcesDialogController,
    //         template: sourcesDialogTemplate,
    //         bindToController: true,
    //         controllerAs: 'vm',
    //         locals: {
    //             latestEditions: this.latestEditions,
    //             selectedOrigins: this.filter.origins
    //         }
    //     } )
    //         .then( filter => this.reload( filter ) );
    // }

    // /**
    //  * Abre o filtro (popup) por data
    //  */
    // public openDateFilter(): void {
    //     this.$mdDialog.show( {
    //         controller: DatesDialogController,
    //         template: datesDialogTemplate,
    //         bindToController: true,
    //         controllerAs: 'vm',
    //         locals: {
    //             dateMin: this.filter.dateMin,
    //             dateMax: this.filter.dateMax
    //         }
    //     } )
    //         .then( filter => {
    //             this.reload( filter );
    //         } );
    // }

    // /**
    //  * Recarrega a página
    //  */
    // public reload( filter ): void {
    //     this.resetPagination();
    //     filter.pageNumber = 1;
    //     this.getNews( filter );
    // }


    // /**
    //  * Reinicializa paginação
    //  */
    // public resetPagination(): void {
    //     this.news = [];
    //     this.populated = false;
    //     this.hasMoreNews = true;
    //     this.currentPage = 0;
    // }
}
