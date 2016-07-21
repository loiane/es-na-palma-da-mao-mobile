import { Component, OnInit } from '@angular/core';
import { Loading, NavController } from 'ionic-angular';
import { NewsApiService } from '../shared/news-api.service';
import { News, NewsDetail, NewsDetailComponent } from '../index';

@Component( {
    moduleId: __moduleName,
    templateUrl: './news-highlights.component.html',
    styleUrls: [ './news-highlights.component.css' ],
    providers: [ NewsApiService ]
})
export class NewsHighlightsComponent implements OnInit {

    private highlights: News[] = [];
    private loading: Loading;

    /**
     * Creates an instance of NewsHighlightsComponent.
     * 
     * @param {NavController} nav
     * @param {NewsApiService} newsApiService
     */
    constructor( public nav: NavController,
                 private newsApiService: NewsApiService ) {}

    /**
    * Inicializa o component
    * 
    * @returns {*}
    */
    public ngOnInit(): any {
        this.loading = Loading.create();
        this.getHighlightNews();
    }

    /**
     * 
     * 
     * @returns {Promise<any>}
     */
    public showLoading(): Promise<any> {
        return this.nav.present( this.loading );
    }


    /**
     * 
     * 
     * @returns {Promise<any>}
     */
    public hideLoading(): Promise<any> {
        return this.loading.dismiss();
    }


    /**
     * Obtém a 1° notícia de destaque
     * 
     * @readonly
     * @type {News}
     */
    public get firstNews(): News {
        return this.highlights[ 0 ];
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
        this.showLoading();
        this.newsApiService.getHighlightNews()
                           // .finally( () => this.hideLoading() )
                           .subscribe( highlights => this.highlights = highlights, 
                                       null, 
                                       () => this.hideLoading() );

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
