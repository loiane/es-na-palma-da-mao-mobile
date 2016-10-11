import { IScope } from 'angular';

import { NewsApiService, News } from '../shared/index';
import { TransitionService } from '../../shared/index';

export class NewsHighlightsController {

    public static $inject: string[] = [ '$scope', 'newsApiService', 'transitionService' ];

    public highlights: News[] = [];

    /**
     * @constructor
     *
     * @param {IScope} $scope
     * @param {NewsApiService} newsApiService
     * @param {TransitionService} transitionService
     */
    constructor( private $scope: IScope,
        private newsApiService: NewsApiService,
        private transitionService: TransitionService ) {

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
        this.transitionService.changeState( 'app.news/:id', { id: id }, { type: 'slide', direction: 'left' });
    }
}


