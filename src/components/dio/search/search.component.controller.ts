import { IScope, IPromise, IWindowService, ILogService } from 'angular';

import filterTemplate from './filter/filter.html';
import { FilterController } from './filter/filter.controller';
import { ToastService } from '../../shared/toast/index';
import {
    SearchFilter,
    SearchResult,
    Hit,
    Edition,
    DioApiService
} from '../shared/index';


export class SearchController {

    public static $inject: string[] = [
        '$scope',
        '$state',
        '$window',
        '$mdDialog',
        '$ionicLoading',
        'dioApiService',
        'toast',
        '$ionicScrollDelegate'
    ];

    private hits: Hit[] = [];
    private pristine = true;
    private hasMoreHits = false;
    private totalHits: number = 0;
    private filter: SearchFilter = {
        pageNumber: 0,
        sort: 'date'
    };


    /**
     * Creates an instance of SearchController.
     * 
     * @param {IScope} $scope
     * @param {angular.ui.IStateService} $state
     * @param {IWindowService} $window
     * @param {angular.material.IDialogService} $mdDialog
     * @param {ionic.loading.IonicLoadingService} $ionicLoading
     * @param {DioApiService} dioApiService
     * @param {ToastService} toast
     * @param {ionic.scroll.IonicScrollDelegate} $ionicScrollDelegate
     */
    constructor( private $scope: IScope,
                 private $state: angular.ui.IStateService,
                 private $window: IWindowService,
                 private $mdDialog: angular.material.IDialogService,
                 private $ionicLoading: ionic.loading.IonicLoadingService,
                 private dioApiService: DioApiService,
                 private toast: ToastService,
                 private $ionicScrollDelegate: ionic.scroll.IonicScrollDelegate ) {
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }


    /**
     * Ativa o controller
     */
    public activate(): void {}

    /**
     * 
     * 
     * @param {SearchFilter} options
     * @returns {IPromise<SearchResult[]>}
     */
    public search( options: SearchFilter ): IPromise<SearchResult> {

        angular.extend( this.filter, options || {} ); // atualiza o filtro

        if ( this.filter.pageNumber === 0 ) {
             this.$ionicLoading.show();
             this.hits = [];
             this.hasMoreHits = false;
             this.totalHits = 0;
        }

        return this.dioApiService.search( this.filter )
                                 .then( ( nextResults: SearchResult ) => {
                                     this.totalHits = nextResults.totalHits;
                                     this.hits = this.hits.concat( nextResults.hits );
                                     this.hasMoreHits = nextResults.hits && nextResults.hits.length > 0;
                                     this.pristine = false;

                                     return nextResults;
                                 } )
                                 .catch( error => {
                                     this.toast.warn( { title: 'Falha ao consultar o DIO/ES' } );
                                     return error;
                                 })
                                 .finally( () => {
                                     this.$ionicLoading.hide();
                                     this.$scope.$broadcast( 'scroll.infiniteScrollComplete' );
                                 } );
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
        } )
        .then( ( newFilter: SearchFilter ) => {
            this.search( newFilter );
        } );
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
