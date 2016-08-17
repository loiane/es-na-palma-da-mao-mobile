import moment from 'moment';
import { IScope, IPromise } from 'angular';
import { DriverData, Ticket, DriverStatus, DetranApiService, TicketColorService } from '../shared/index';


/**
 * @class DriverLicenseStatusController
 */
export class DriverLicenseStatusController {

    public static $inject: string[] = [ '$scope', 'ticketColorService', 'detranApiService' ];

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
     * Creates an instance of DriverLicenseStatusController.
     * 
     * @param {IScope} $scope
     * @param {TicketColorService} ticketColorService
     * @param {DetranApiService} detranApiService
     */
    constructor( private $scope: IScope,
                 private ticketColorService: TicketColorService,
                 private detranApiService: DetranApiService ) {
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }


    /**
     * Preenche a página com dados do condutor, bem como de suas eventuais multas.
     */
    public activate(): void {
        this.getDriverData();
        this.getDriverTickets();
    }

    /**
     * Se dados do condutor já foram carregados.
     * 
     * @readonly
     * @type {boolean}
     */
    public get driverDataPopulated(): boolean {
        return angular.isDefined( this.driverData );
    }

    /**
     * 
     * 
     * @readonly
     * @type {boolean}
     */
    public get ticketsPopulated(): boolean {
        return angular.isDefined( this.tickets );
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
        return moment( this.expirationDate ).add( 30, 'day' ).isBefore( moment().startOf( 'day' ) );
    }

    /**
     * Se a carteira de motorista do condutor precisa ser renovada (Período de 1 mês após o vencimento)
     * 
     * @readonly
     * @type {boolean}
     */
    public get licenseRenew(): boolean {
        return moment( this.expirationDate ).add( 30, 'day' ).isAfter( moment().startOf( 'day' ) ) &&
               moment().startOf( 'day' ).isAfter( this.expirationDate );
    }

    /**
     * A data de validade da carteira de motorista do condutor autenticado no sistema.
     * 
     * @readonly
     * @type {Date}
     */
    public get expirationDate(): Date {
        return this.driverData.expirationDate;
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
     * Obtem a cor relativa à uma classificação de multa. Usado somente na interface.
     * 
     * @param {string} level
     * @returns {string}
     */
    public getTicketLevelColor( level: string ): string {
        return this.ticketColorService.getTicketLevelColor( level );
    }


    /**
     * Obtem dados da carteira de motorista do condutor autenticado no sistema.
     * 
     * @returns {IPromise<DriverData>}
     */
    public getDriverData(): IPromise<DriverData> {
        return this.detranApiService.getDriverData()
            .then(( driverData ) => {
                this.driverData = driverData;
                return driverData;
            });
    }

    /**
     * Obtem as eventuais multas pertencentes ao condutor autenticado no sistema.
     * 
     * @returns {IPromise<Ticket[]>}
     */
    public getDriverTickets(): IPromise<Ticket[]> {
        return this.detranApiService.getDriverTickets()
            .then( tickets => {
                this.tickets = tickets || [];
                return this.tickets;
            });
    }
}
