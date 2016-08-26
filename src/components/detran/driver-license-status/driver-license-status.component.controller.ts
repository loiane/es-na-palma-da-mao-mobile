import moment from 'moment';
import { IScope, IPromise } from 'angular';
import { DriverData, Ticket, DriverStatus, DetranApiService, TicketColorService, DriverLicenseStorage, DriverLicense } from '../shared/index';
import registerLicenseTemplate from '../shared/add-license/add-license.html';
import { AddLicenseController } from '../shared/add-license/add-license.controller';

/**
 * @class DriverLicenseStatusController
 */
export class DriverLicenseStatusController {

    public static $inject: string[] = [ '$scope', '$ionicLoading', 'ticketColorService', 'detranApiService', 'detranStorage', '$mdDialog' ];

    /**
     * Informações sobre a carteira de motorista do condutor
     * 
     * @type {DriverData}
     */
    public driverData: DriverData = undefined;

    public defaultMessage: string = 'Nenhuma multa encontrada para a CNH';
    public default404Message: string = 'Problema ao buscar dados. Verifique o número da CNH';
    public errorMessage: string = '';

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
        private $ionicLoading: ionic.loading.IonicLoadingService,
        private ticketColorService: TicketColorService,
        private detranApiService: DetranApiService,
        private driverLicenseStorage: DriverLicenseStorage,
        private $mdDialog: angular.material.IDialogService ) {
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }


    /**
     * Preenche a página com dados do condutor, bem como de suas eventuais multas.
     */
    public activate(): void {
        this.errorMessage = this.defaultMessage;
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
     * Se a carteira de motorista do condutor precisa ser renovada (Período de até 1 mês após o vencimento)
     * 
     * @readonly
     * @type {boolean}
     */
    public get licenseRenew(): boolean {
        return moment( this.expirationDate ).add( 1, 'month' ).isAfter( moment().startOf( 'day' ) ) &&
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
     * @returns {void}
     */
    public getDriverData(): IPromise<DriverData> {
        return this.detranApiService.getDriverData()
            .then( ( driverData ) => {
                this.driverData = driverData;
                return driverData;
            } )
            .catch( ( error ) => {
                this.setErrorMessage( error.status );
                return error;
            } );
    }

    /**
     * Obtem as eventuais multas pertencentes ao condutor autenticado no sistema.
     * 
     * @returns {void}
     */
    public getDriverTickets(): IPromise<Ticket[]> {
        return this.detranApiService.getDriverTickets()
            .then( tickets => {
                this.errorMessage = this.defaultMessage;
                this.tickets = tickets || [];
                return this.tickets;
            })
            .catch( ( error ) => {
                this.setErrorMessage( error.status );
                return error;
            } );
    }


    /**
     * 
     */
    public editLicense(): IPromise<DriverLicense> {
        return this.$mdDialog.show( {
            controller: AddLicenseController,
            template: registerLicenseTemplate,
            bindToController: true,
            controllerAs: 'vm',
            locals: this.driverLicenseStorage.driverLicense || {}
        } )
        .then( ( license: DriverLicense ) => {
            this.$ionicLoading.show();
            return this.detranApiService.saveLicense( license )
                .then( () => {
                    this.driverLicenseStorage.driverLicense = license;
                    return license;
                } )
                .finally( () => this.$ionicLoading.hide() );
        } );
    }

    /**
     * 
     * 
     * @private
     * @param {number} status
     */
    private setErrorMessage( status: number ) {
        this.errorMessage = this.defaultMessage;
        if ( status === 404 ) {
            this.errorMessage = this.default404Message;
        }
    }
}
