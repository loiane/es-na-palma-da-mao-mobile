import { Component, OnInit, ViewChild } from '@angular/core';
import { DetranApiService } from '../shared/detran-api.service';
import { DriverData, Ticket, DriverStatus } from '../shared/models/index';
import { Observable } from 'rxjs/Observable';
import { FromNowPipe } from '../../shared/from-now.pipe';
import { CapitalizePipe } from '../../shared/capitalize.pipe';
import moment from 'moment';

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
     * 
     * 
     * @type {number}
     */
    public selectedIndex: number = -1;

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
    public tickets: Ticket[] = [];

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
     * Se dados do condutor já foram carregados.
     * 
     * @readonly
     * @type {boolean}
     */
    public get driverDataPopulated(): boolean {
        return !!this.driverData;
    }

    /**
     * Se as multas do condutor já foram carregadas.
     * 
     * @readonly
     * @type {boolean}
     */
    public get ticketsPopulated(): boolean {
        return !!this.tickets.length;
    }

    /**
     * Se o condutor autenticado no sistema está com a carteira de motorista 'ok'.
     * 
     * @readonly
     * @type {boolean}
     */
    public get licenseOk(): boolean {
        return this.driverDataPopulated && this.driverData.status === DriverStatus.Ok;
    }

    /**
     * Se o condutor autenticado no sistema está com a carteira de motorista bloqueada.
     * 
     * @readonly
     * @type {boolean}
     */
    public get licenseBlocked(): boolean {
        return this.driverDataPopulated && this.driverData.status === DriverStatus.Blocked;
    }

    /**
    * Se o condutor autenticado no sistema está com a carteira de motorista vencida.
    * 
    * @readonly
    * @type {boolean}
    */
    public get licenseExpired(): boolean {
        return this.driverDataPopulated && moment( this.expirationDate ).add( 1, 'months' ).isBefore( moment().startOf( 'day' ) );
    }

    /**
     * Se a carteira de motorista do condutor precisa ser renovada (Período de 1 mês após o vencimento)
     * 
     * @readonly
     * @type {boolean}
     */
    public get licenseRenew(): boolean {
        return this.driverDataPopulated
            && moment( this.expirationDate ).add( 1, 'months' ).isAfter( moment().startOf( 'day' ) )
            && moment().startOf( 'day' ).isAfter( this.expirationDate );
    }

    /**
     * A data de validade da carteira de motorista do condutor autenticado no sistema.
     * 
     * @readonly
     * @type {Date}
     */
    public get expirationDate(): Date {
        if ( this.driverDataPopulated ) {
            return this.driverData.expirationDate;
        }
    }

    /**
     * Indica se existem multas para o condutor autenticado no sistema.
     * 
     * @readonly
     * @type {boolean}
     */
    public get hasTickets(): boolean {
        return this.tickets.length > 0;
    }

    /**
     * O total de pontos acumulados na carteira do condutor autenticado, nos últimos 12 meses.
     * 
     * @readonly
     * @type {number}
     */
    public get last12MonthsPoints(): number {
        let points = 0;
        this.tickets.forEach( ticket => {
            if ( moment( ticket.date ).isAfter( moment().startOf( 'day' ).subtract( 1, 'year' ) ) ) {
                points += ticket.points;
            }
        });
        return points;
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
     * Exibe o detalhamento de uma multa.
     * 
     * @param {number} $index - o índice da multa na lista de multas do condutor exibida.
     */
    public showDetails( $index: number ): void {
        if ( this.selectedIndex !== $index ) {
            this.selectedIndex = $index;
        } else {
            this.selectedIndex = -1;
        }
    }

    /**
     * 
     * 
     * @returns {Observable<DriverData>}
     */
    public getDriverData(): void {
        this.detranApiService.getDriverData()
            .subscribe(
            driverData => this.driverData = driverData,
            error => this.driverData = undefined
            );
    }

    /**
     * 
     * 
     * @returns {Observable<Ticket[]>}
     */
    public getTickets(): Observable<Ticket[]> {
        return this.detranApiService.getTickets()
            .map( tickets => this.tickets = tickets );
    }
}
