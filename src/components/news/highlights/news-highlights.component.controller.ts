import {IScope} from 'angular';
import {loading} from 'ionic';
import {IStateService} from 'angular-ui-router';

import NewsApiService from '../shared/news-api.service';

class NewsHighlightsController {

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
    activate():void {
        this.getHighlightNews();
    }

    /**
     *
     * @returns {*|{}}
     */
    get firstNews() {
        return this.highlights[0];
    }

    /**
     *
     * @returns {*}
     */
    get otherNews() {
        return this.highlights.length > 0 ? this.highlights.slice( 1 ) : [];
    }

    /**
     *
     */
    getHighlightNews() {
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
    goToNews( id ):void {
        this.$state.go( 'app.news/:id', {id: id} );
    }
}

NewsHighlightsController.$inject = ['$scope', 'newsApiService', '$ionicLoading', '$state'];

export default NewsHighlightsController;


