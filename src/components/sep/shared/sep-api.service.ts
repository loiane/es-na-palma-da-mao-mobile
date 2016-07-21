import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Process } from './models/index';
import { Settings } from '../../shared/index';

@Injectable()
export class SepApiService {

    /**
     * @param {Object} $http - angular $http service
     * @param {Object} settings - application settings
     * @constructor
     */
    constructor(private http: Http, private settings: Settings) {
    }


    private handleError( error: any, disappointed: any): Observable<any> {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error( errMsg); // log to console instead

        return Observable.throw( errMsg);
    }

    /**
     *
     * @param {string} procNumber - process number
     * @returns {IPromise<Process[]>}
     */
    public getProcessByNumber( procNumber: string): Observable<Process> {
            return this.http
                .get(`${this.settings.api.sep}/${procNumber || ''}`)
                .map( res => <Process>res.json() )
                .catch( this.handleError );
        }
}
