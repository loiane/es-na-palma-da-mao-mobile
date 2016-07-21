import { Component, OnInit } from '@angular/core';
import { Loading, NavController, NavParams } from 'ionic-angular';

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
    private loading: Loading;
    
    /**
     * Creates an instance of NewsDetailComponent.
     * 
     * @param {NavController} nav
     * @param {NavParams} params
     * @param {NewsApiService} newsApiService
     */
    constructor( public nav: NavController, 
                 public params: NavParams,
                 private newsApiService: NewsApiService ) {
    }

    
    /**
     * 
     * 
     * @returns {*}
     */
    public ngOnInit(): any {
        this.loading = Loading.create();
        this.getNewsById( this.params.data.newsId );
    }


    /**
     * Carrega um notícia
     * 
     * @param {string} id
     */
    public getNewsById( id: string ): void {
        this.showLoading();
        this.newsApiService.getNewsById( id )
                         .subscribe( news => this.news = news, 
                                     null, 
                                     () => this.hideLoading() );
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
     * 
     * 
     * @readonly
     * @type {string}
     */
    public get origin(): string {
        return this.params.data.origin || 'Notícia';
    }
}
