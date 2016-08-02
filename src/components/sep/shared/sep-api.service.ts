import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Process } from './models/index';
import { Settings } from '../../shared/index';

@Injectable()
export class SepApiService {


    /**
     * Creates an instance of SepApiService.
     * 
     * @param {Http} http
     * @param {Settings} settings
     */
    constructor( private http: Http, private settings: Settings ) {
    }



    /**
     * 
     * 
     * @param {string} procNumber
     * @returns {Observable<Process>}
     */
    public getProcessByNumber( procNumber: string ): Observable<Process> {
        return this.http
                   .get( `${this.settings.api.sep}/${procNumber || ''}` )
                   .map( res => <Process>res.json() )
                   .share();
    }
}
