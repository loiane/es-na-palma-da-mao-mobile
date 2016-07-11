import {IScope} from 'angular';
import {loading} from 'ionic';
import {IStateService} from 'angular-ui-router';

import NewsApiService from '../shared/news-api.service';

class NewsHighlightsController {

    static $inject:string[] = ['$scope', 'newsApiService', '$ionicLoading', '$state'];

    private highlights = [];

    /**
     * @constructor
     *
     * @param {IScope} $scope
     * @param {NewsApiService} newsApiService
     * @param {IonicLoadingService} $ionicLoading
     * @param {IStateService} $state
     */
    constructor( private $scope:IScope,
                 private newsApiService:NewsApiService,
                 private $ionicLoading:loading.IonicLoadingService,
                 private $state:IStateService ) {

        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }

    /**
     * Ativa o controller
     *
     * @returns {void}
     */
    public activate():void {
        this.getHighlightNews();
    }

    /**
     *
     * @returns {*|{}}
     */
    public get firstNews() {
        return this.highlights[0];
    }

    /**
     *
     * @returns {*}
     */
    public get otherNews() {
        return this.highlights.length > 0 ? this.highlights.slice( 1 ) : [];
    }

    /**
     *
     */
    public getHighlightNews() {
        this.$ionicLoading.show( 200 );
        this.newsApiService.getHighlightNews()
            .then( highlights => this.highlights = highlights )
            .finally( () => {
                this.$ionicLoading.hide();
            } );
    }

    /**
     *
     * @param id
     */
    public goToNews( id ):void {
        this.$state.go( 'app.news/:id', {id: id} );
    }
}

export default NewsHighlightsController;


