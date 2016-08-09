import {IScope, IPromise} from 'angular';
import {IStateService} from 'angular-ui-router';

import { NewsApiService, News, NewsDetail } from '../shared/index';

export class NewsHighlightsController {

    public static $inject: string[] = [ '$scope', 'newsApiService', '$ionicLoading', '$state' ];

    private highlights: News[] = [];

    /**
     * @constructor
     *
     * @param {IScope} $scope
     * @param {NewsApiService} newsApiService
     * @param {IonicLoadingService} $ionicLoading
     * @param {IStateService} $state
     */
    constructor( private $scope: IScope,
                 private newsApiService: NewsApiService,
                 private $ionicLoading: ionic.loading.IonicLoadingService,
                 private $state: IStateService ) {

        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }

    /**
     * Ativa o controller
     *
     * @returns {void}
     */
    public activate(): void {
        this.getHighlightNews();
    }


    /**
     * Obtém a 1° notícia de destaque
     * 
     * @readonly
     * @type {News}
     */
    public get firstNews(): News {
        return this.highlights[0];
    }


    /**
     * Obtém todas as notícias em destaque menos a 1°.
     * 
     * @readonly
     * @type {News[]}
     */
    public get otherNews(): News[] {
        return this.highlights.length > 0 ? this.highlights.slice( 1 ) : [];
    }


    /**
     * Obtém a lista de notícias em destaque
     */
    public getHighlightNews(): void {
        this.$ionicLoading.show( 200 );
        this.newsApiService.getHighlightNews()
            .then( highlights => this.highlights = highlights )
            .finally( () => {
                this.$ionicLoading.hide();
            } );
    }

    /**
     * Navega para uma notícia
     * 
     * @param {any} id
     */
    public goToNews( id ): void {
        this.$state.go( 'app.news/:id', {id: id} );
    }
}


