
import { Component, OnInit } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { Filter } from '../filter';

@Component( {
    moduleId: __moduleName,
    templateUrl: './news-filter.component.html',
    styleUrls: ['./news-filter.component.css'],
})
export class NewsFilter {

    private filter: Filter;
    private availableOrigins: string[] = [];

    /**
     * Creates an instance of NewsFilter.
     * 
     * @param {ViewController} viewCtrl
     */
    constructor(  private params: NavParams, private viewCtrl: ViewController ) { 
        this.filter = this.params.data.filter as Filter;
        this.availableOrigins = this.params.data.availableOrigins;
    }

    
    /**
     * 
     */
    public close(): void {
        this.viewCtrl.dismiss();
    }

    
    /**
     * 
     */
    public doFilter(): void {
        this.viewCtrl.dismiss( this.filter );
    }

    
    /**
     * 
     */
    public limpar(): void {
        this.filter.pageNumber = 1;
        this.filter.dateMax = undefined;
        this.filter.dateMin = undefined;
        this.filter.origins = [];
    }
}