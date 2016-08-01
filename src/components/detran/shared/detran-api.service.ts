import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { DriverData, Charge, DriverLicenseProcess, Ticket } from './models/index';
import { Settings } from '../../shared/index';

/**
 * 
 * 
 * @export
 * @class DetranApiService
 */
@Injectable()
export class DetranApiService {

    /**
     * @constructor
     * 
     * @param {IHttpService} $http - angular $http service
     * @param {any} settings - application settings
     */
    constructor(private http: Http, private settings: Settings) {
    }


    /**
     * 
     * 
     * @private
     * @param {*} error
     * @param {*} disappointed
     * @returns {Observable<any>}
     */
    private handleError( error: any, disappointed: any): Observable<any> {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error( errMsg); // log to console instead

        return Observable.throw( errMsg );
    }

    /**
     * 
     * 
     * @returns {Observable<DriverData>}
     */
    public getDriverData(): Observable<DriverData> {
        return this.http
                .get( `${this.settings.api.detran}/driverData` )
                .map( response => <DriverData>response.json() )
                .catch(this.handleError);
    }

    /**
     * 
     * 
     * @returns {Observable<Ticket[]>}
     */
    public getTickets(): Observable<Ticket[]> {
        return this.http
            .get( `${this.settings.api.detran}/tickets` )
            .map( response => <Ticket[]>response.json() )
            .catch(this.handleError);
    }

    /**
     * 
     * 
     * @returns {Observable<Charge[]>}
     */
    public getAdministrativeCharges(): Observable<Charge[]> {
        return this.http
            .get( `${this.settings.api.detran}/administrativeCharges ` )
            .map( response => <Charge[]>response.json() )
            .catch(this.handleError);
    }

    /**
     * 
     * 
     * @returns {Observable<DriverLicenseProcess[]>}
     */
    public getDriverLicenseProcess(): Observable<DriverLicenseProcess[]> {
        return this.http
            .get( `${this.settings.api.detran}/driverLicenseProcess ` )
            .map( response => <DriverLicenseProcess[]>response.json() )
            .catch(this.handleError);
    }
}
