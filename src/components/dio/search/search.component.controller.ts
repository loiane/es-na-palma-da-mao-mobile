import { IScope, IPromise, IWindowService } from 'angular';

import filterTemplate from './filter/filter.html';
import { FilterController } from './filter/filter.controller';
import {
    SearchFilter,
    SearchResult,
    Hit,
    DioApiService
} from '../shared/index';


export class SearchController {

    public static $inject: string[] = [
        '$scope',
        '$window',
        '$mdDialog',
        'dioApiService'
    ];

    public hits: Hit[] = [];
    public searched = false;
    public hasMoreHits = false;
    public totalHits: number = 0;
    public filter: SearchFilter = {
        pageNumber: 0,
        sort: 'date'
    };


    /**
     * Creates an instance of SearchController.
     * 
     * @param {IScope} $scope
     * @param {IWindowService} $window
     * @param {angular.material.IDialogService} $mdDialog
     * @param {DioApiService} dioApiService
     */
    constructor( private $scope: IScope,
        private $window: IWindowService,
        private $mdDialog: angular.material.IDialogService,
        private dioApiService: DioApiService ) {
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }


    /**
     * Ativa o controller
     */
    public activate(): void { }

    /**
     * 
     * 
     * @param {SearchFilter} options
     * @returns {IPromise<SearchResult[]>}
     */
    public search( filter: SearchFilter ): IPromise<SearchResult> {
        angular.extend( this.filter, filter || {}); // atualiza o filtro

        if ( this.filter.pageNumber === 0 ) {
            this.hits = [];
            this.hasMoreHits = false;
            this.totalHits = 0;
        }

        return this.dioApiService.search( this.filter )
            .then(( nextResults: SearchResult ) => {
                this.totalHits = nextResults.totalHits;
                this.hits = this.hits.concat( nextResults.hits );
                this.hasMoreHits = nextResults.hits && nextResults.hits.length > 0;
                return nextResults;
            })
            .finally(() => {
                this.searched = true;
                this.$scope.$broadcast( 'scroll.infiniteScrollComplete' );
            });
    }

    /**
     * Abre o filtro (popup) por data
     */
    public openFilter(): void {
        this.$mdDialog.show( {
            controller: FilterController,
            template: filterTemplate,
            bindToController: true,
            controllerAs: 'vm',
            locals: this.filter
        })
            .then( filter => {
                filter.pageNumber = 0;
                this.search( filter );
            });
    }



    /**
    * 
    * 
    * @param {string} url
    */
    public open( url: string ): void {
        this.$window.open( url, '_system' );
    }
}
