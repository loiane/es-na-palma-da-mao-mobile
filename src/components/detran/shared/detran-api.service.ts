import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DriverData, Charge, DriverLicenseProcess, Ticket } from './models/index';
import { Settings, AuthorizedHttp } from '../../shared/index';

/**
 * 
 * 
 * @export
 * @class DetranApiService
 */
@Injectable()
export class DetranApiService {

    /**
     * Creates an instance of DetranApiService.
     * 
     * @param {AuthorizedHttp} http
     * @param {Settings} settings
     */
    constructor( private http: AuthorizedHttp, private settings: Settings ) {
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
            .share();
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
            .share();
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
            .share();
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
            .share();
    }
}
