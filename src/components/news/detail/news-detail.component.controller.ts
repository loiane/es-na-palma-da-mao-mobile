import { IScope, IPromise } from 'angular';
import { IStateService } from 'angular-ui-router';

import { News, NewsDetail, NewsApiService } from '../shared/index';

export class NewsDetailController {

    public static $inject: string[] = [ '$scope', 'newsApiService', '$ionicLoading', '$stateParams' ];

    private news: NewsDetail;

    /**
     * @constructor
     *
     * @param $scope
     * @param newsApiService
     * @param $ionicLoading
     * @param $stateParams
     */
    constructor( private $scope: IScope,
                 private newsApiService: NewsApiService,
                 private $ionicLoading: ionic.loading.IonicLoadingService,
                 private $stateParams: IStateService ) {
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }


    /**
     * Ativa o controller
     *
     * @returns {void}
     */
    public activate(): void {
        this.getNewsById( this.$stateParams.id );
    }


    /**
     * Carrega um notícia
     * 
     * @param {string} id
     */
    public getNewsById( id: string ): void {
        this.$ionicLoading.show();
        this.newsApiService.getNewsById( id )
            .then( news => this.news = news )
            .finally( () => {
                this.$ionicLoading.hide();
            } );
    }
}
