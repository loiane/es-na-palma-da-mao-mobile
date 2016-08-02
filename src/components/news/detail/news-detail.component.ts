import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { News, NewsDetail } from '../shared/models/index';
import { NewsApiService } from '../shared/news-api.service';

@Component( {
    moduleId: __moduleName,
    templateUrl: './news-detail.component.html',
    styleUrls: [ './news-detail.component.css' ],
    providers: [ NewsApiService ]
})
export class NewsDetailComponent implements OnInit {

    private news: NewsDetail;
    
    /**
     * Creates an instance of NewsDetailComponent.
     * 
     * @param {NavParams} params
     * @param {NewsApiService} newsApiService
     */
    constructor( public params: NavParams,
                 private newsApiService: NewsApiService ) {
    }

    
    /**
     * 
     * 
     * @returns {*}
     */
    public ngOnInit(): any {
        this.getNewsById( this.params.data.newsId );
    }


    /**
     * Carrega um notícia
     * 
     * @param {string} id
     */
    public getNewsById( id: string ): void {
        this.newsApiService.getNewsById( id )
                           .subscribe( news => this.news = news );
    }

    
    /**
     * 
     * 
     * @readonly
     * @type {string}
     */
    public get origin(): string {
        return this.params.data.origin || 'Notícia';
    }
}
