import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import moment from 'moment';

import { FromNowPipe, CapitalizePipe } from '../../shared/index';
import { DetranApiService } from '../shared/detran-api.service';
import { DriverData, Ticket, DriverStatus } from '../shared/models/index';

/**
 * @class DriverLicenseStatusController
 */
@Component( {
    moduleId: __moduleName,
    templateUrl: './driver-license-status.component.html',
    styleUrls: [ './driver-license-status.component.css' ],
    providers: [ DetranApiService ],
    pipes: [ FromNowPipe, CapitalizePipe ]
})
export class DriverLicenseStatusComponent implements OnInit {


    /**
     * O total de pontos acumulados na carteira do condutor autenticado, nos últimos 12 meses.
     * 
     * @readonly
     * @type {number}
     */
    public lastYearPoints: number = 0;

    /**
     * 
     * 
     * @type {number}
     */
    // public selectedTicket: Ticket = undefined;

    /**
     * Informações sobre a carteira de motorista do condutor
     * 
     * @type {DriverData}
     */
    public driverData: DriverData = undefined;

    /**
     * Lista de multas
     * 
     * @type {Ticket[]}
     */
    public tickets: Ticket[] = undefined;

    /**
     * Lista de possíveis classificações de multas: leve, média, grave ou gravíssima.
     * 
     * @private
     * @type { name: string, color: string }
     */
    private classifications = [
        { name: 'leve', color: 'green' },
        { name: 'média', color: 'yellow' },
        { name: 'grave', color: 'red' },
        { name: 'gravíssima', color: 'black' }
    ];

    constructor( private detranApiService: DetranApiService ) {
    }

    /**
     * 
     * 
     * @returns {*}
     */
    public ngOnInit(): any {
        this.getDriverData();
        this.getTickets();
    }

    /**
     * Se o condutor autenticado no sistema está com a carteira de motorista 'ok'.
     * 
     * @readonly
     * @type {boolean}
     */
    public get licenseOk(): boolean {
        return this.driverData.status === DriverStatus.Ok;
    }

    /**
     * Se o condutor autenticado no sistema está com a carteira de motorista bloqueada.
     * 
     * @readonly
     * @type {boolean}
     */
    public get licenseBlocked(): boolean {
        return this.driverData.status === DriverStatus.Blocked;
    }

    /**
    * Se o condutor autenticado no sistema está com a carteira de motorista vencida.
    * 
    * @readonly
    * @type {boolean}
    */
    public get licenseExpired(): boolean {
        return moment( this.driverData.expirationDate ).add( 1, 'months' ).isBefore( moment().startOf( 'day' ) );
    }

    /**
     * Se a carteira de motorista do condutor precisa ser renovada (Período de 1 mês após o vencimento)
     * 
     * @readonly
     * @type {boolean}
     */
    public get licenseRenew(): boolean {
        return moment( this.driverData.expirationDate ).add( 1, 'months' ).isAfter( moment().startOf( 'day' ) ) && 
               moment().startOf( 'day' ).isAfter( this.driverData.expirationDate );
    }


    /**
     * Obtem a cor relativa à uma classificação de multa. Usado somente na interface.
     * 
     * @param {string} classificationName
     * @returns {string}
     */
    public getClassificationColor( classificationName: string ): string {
        classificationName = classificationName.toLowerCase();
        let classification = this.classifications.filter( c => c.name === classificationName );

        if ( classification && classification.length === 1 ) {
            return classification[ 0 ].color;
        }
    }

    /**
     * 
     * 
     * @returns {Observable<DriverData>}
     */
    public getDriverData(): void {
        this.detranApiService.getDriverData()
            .subscribe( driverData => this.driverData = driverData, error => this.driverData = undefined );
    }

    /**
     * 
     * 
     * @returns {Observable<Ticket[]>}
     */
    public getTickets(): void {
        this.detranApiService.getTickets()
            .subscribe( tickets => {
                this.tickets = tickets;
                this.lastYearPoints = this.calculateLastYearPoints( tickets );
            }, error => this.tickets = undefined );
    }


    
    /**
     * 
     * 
     * @private
     * @param {Ticket[]} tickets
     * @returns {number}
     */
    private calculateLastYearPoints( tickets: Ticket[] ): number {
        let points = 0;

        tickets.forEach( ticket => {
            if ( moment( ticket.date ).isAfter( moment().startOf( 'day' ).subtract( 1, 'year' ) ) ) {
                points += ticket.points;
            }
        });
        return points;
    }
}
