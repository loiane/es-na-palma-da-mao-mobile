import { Component, OnInit } from '@angular/core';
import { Loading, NavController, InfiniteScroll, Modal } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import moment from 'moment';

import { NewsApiService } from '../shared/news-api.service';
import { NewsFilter } from './news-filter/news-filter.component';
import { News, NewsDetail, NewsDetailComponent } from '../index';
import { Filter } from './filter';
import { FromNowPipe } from '../../shared/pipes/index';

@Component( {
    moduleId: __moduleName,
    templateUrl: './news-list.component.html',
    styleUrls: [ './news-list.component.css' ],
    providers: [ NewsApiService ],
    pipes: [ FromNowPipe ]
})
export class NewsListComponent implements OnInit {

    private hasMorePages: boolean = true;
    private loaded: boolean = false;
    private availableOrigins: string[];
    private loadedNews: News[] = [];
    private filter: Filter = {
        origins: [],
        pageNumber: 1,
        dateMin: this.sixMonthsAgo,
        dateMax: this.today
    };

    /**
     * Creates an instance of NewsListComponent.
     * 
     * @param {NavController} nav
     * @param {NewsApiService} newsApiService
     */
    constructor( public nav: NavController, private newsApiService: NewsApiService ) { }


    /**
    * Inicializa o component
    * 
    * @returns {*}
    */
    public ngOnInit(): any {
        this.newsApiService.getAvailableOrigins()
            .flatMap( origins => {
                this.availableOrigins = origins;
                return this.getNews( { origins: origins } );
            } )
            .subscribe();
    }


    /**
     * 
     * 
     * @readonly
     * @private
     * @type {string}
     */
    private get sixMonthsAgo(): string {
        return moment().subtract( 6, 'months' ).format( 'YYYY-MM-DD' );
    }


    /**
     * 
     * 
     * @readonly
     * @private
     * @type {string}
     */
    private get today(): string {
        return moment().format( 'YYYY-MM-DD' );
    }


    /**
     * 
     */
    public showFilterModal() {
        let modal = Modal.create( NewsFilter, { availableOrigins: this.availableOrigins, filter: this.filter } );

        modal.onDismiss(( filter: Filter ) => {
            this.reload( filter );
        });

        this.nav.present( modal );
    }


    /**
     * 
     * 
     * @param {*} infiniteScroll
     */
    public doInfinity( infiniteScroll: any ) {
        this.getNews( { pageNumber: this.filter.pageNumber + 1 } )
            .subscribe(() => {
                infiniteScroll.complete();
            });
    }


    /**
   * Obtém uma lista de notícias
   */
    public getNews( options: Filter = { pageNumber: 1 }): Observable<News[]> {
        let obs = this.newsApiService.getNews( Object.assign( this.filter, options ) );
        
        obs.subscribe( news => {
            this.loaded = true;
            this.hasMorePages = !!news.length;
            this.loadedNews = this.loadedNews.concat( news );
        });

        return obs;
    }


    /**
     * Recarrega a página
     */
    public reload( filter: Filter ): Observable<News[]> {
        this.loaded = false;
        this.hasMorePages = true;
        this.loadedNews = [];
        return this.getNews( Object.assign( filter, { pageNumber: 1 } ) );
    }


    /**
     * 
     * 
     * @param {string} newsId
     * @param {string} origin
     */
    public goToNews( newsId: string, origin: string ): void {
        this.nav.push( NewsDetailComponent, { newsId: newsId, origin: origin } );
    }
}
