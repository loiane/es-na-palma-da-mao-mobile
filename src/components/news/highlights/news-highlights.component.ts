import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewsApiService } from '../shared/news-api.service';
import { News, NewsDetail, NewsDetailComponent } from '../index';
import { FromNowPipe } from '../../shared/pipes/index';

@Component( {
    moduleId: __moduleName,
    templateUrl: './news-highlights.component.html',
    styleUrls: [ './news-highlights.component.css' ],
    providers: [ NewsApiService ],
    pipes: [ FromNowPipe ]
})
export class NewsHighlightsComponent implements OnInit {

    private highlights: News[] = [];

    /**
     * Creates an instance of NewsHighlightsComponent.
     * 
     * @param {NavController} nav
     * @param {NewsApiService} newsApiService
     */
    constructor( public nav: NavController,
                 private newsApiService: NewsApiService ) { }

    /**
    * Inicializa o component
    * 
    * @returns {*}
    */
    public ngOnInit(): any {
        this.getHighlightNews();
    }


    /**
     * Obtém a lista de notícias em destaque
     */
    public getHighlightNews(): void {
        this.newsApiService.getHighlightNews()
            .subscribe( highlights => this.highlights = highlights );

    }

    /**
     * Navega para uma notícia
     * 
     * @param {any} id
     */
    public goToNews( newsId: string, origin: string ): void {
        this.nav.push( NewsDetailComponent, { newsId: newsId, origin: origin } );
    }
}
