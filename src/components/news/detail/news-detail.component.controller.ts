import {IScope} from 'angular';
import {loading} from 'ionic';
import {IStateService} from 'angular-ui-router';

import NewsApiService from '../shared/news-api.service';

class NewsDetailController {

    static $inject: string[] = [ '$scope', 'newsApiService', '$ionicLoading', '$stateParams' ];

    private news = [];

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
                 private $ionicLoading: loading.IonicLoadingService,
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
     *
     * @param id
     */
    public getNewsById( id: string ): void {
        this.$ionicLoading.show( 200 );
        this.newsApiService.getNewsById( id )
            .then( news => this.news = news )
            .finally( () => {
                this.$ionicLoading.hide();
            } );
    }
}

export default NewsDetailController;
