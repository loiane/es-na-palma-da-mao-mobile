import {IScope, IPromise} from 'angular';

import { NewsApiService, News, NewsDetail } from '../shared/index';

export class NewsHighlightsController {

    public static $inject: string[] = [ '$scope', 'newsApiService', '$state' ];

    private highlights: News[] = [];

    /**
     * @constructor
     *
     * @param {IScope} $scope
     * @param {NewsApiService} newsApiService
     * @param {angular.ui.IStateService} $state
     */
    constructor( private $scope: IScope,
                 private newsApiService: NewsApiService,
                 private $state: angular.ui.IStateService ) {

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
     * Obtém a lista de notícias em destaque
     */
    public getHighlightNews(): void {
        this.newsApiService.getHighlightNews()
            .then( highlights => this.highlights = highlights );
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


