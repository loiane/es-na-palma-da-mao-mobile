import { IScope, IPromise } from 'angular';
import { Ticket, Vehicle, DetranApiService, TicketColorService } from '../shared/index';


/**
 * 
 * 
 * @export
 * @class VehicleTicketsController
 */
export class VehicleTicketsController {

    public static $inject: string[] = [ '$scope', '$stateParams', 'ticketColorService', 'detranApiService' ];

    /**
     * Lista de multas
     * 
     * @type {Ticket[]}
     */
    public tickets: Ticket[] | undefined;
    public vehicle: Vehicle;

    /**
     * Creates an instance of VehicleTicketsController.
     * 
     * @param {IScope} $scope
     * @param {angular.ui.IStateParamsService} $stateParams
     * @param {TicketColorService} ticketColorService
     * @param {DetranApiService} detranApiService
     */
    constructor( private $scope: IScope,
        private $stateParams: angular.ui.IStateParamsService,
        private ticketColorService: TicketColorService,
        private detranApiService: DetranApiService ) {
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );

        this.vehicle = {
            plate: this.$stateParams[ 'plate' ],
            renavam: this.$stateParams[ 'renavam' ]
        };
    }


    /**
     * Preenche a página com dados do condutor, bem como de suas eventuais multas.
     */
    public activate(): void {
        this.getVehicleTickets( this.vehicle );
    }

    /**
     * Indica se existem multas para o condutor autenticado no sistema.
     * 
     * @readonly
     * @type {boolean}
     */
    public get ticketsFounded(): boolean {
        return !!this.tickets && this.tickets.length > 0;
    }

    /**
     * 
     * 
     * @readonly
     * @type {boolean}
     * @memberOf VehicleTicketsController
     */
    public get ticketsNotFounded(): boolean {
        return !!this.tickets && this.tickets.length === 0;
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
     * 
     * 
     * @param {Vehicle} vehicle
     * @returns {IPromise<Ticket[]>}
     */
    public getVehicleTickets( vehicle: Vehicle ): IPromise<Ticket[]> {
        return this.detranApiService.getVehicleTickets( vehicle )
            .then( tickets => {
                return this.tickets = tickets;
            })
            .catch(( error ) => this.handleError( error ) );
    }

    /**
     * 
     * 
     * @private
     * @param {*} error
     */
    private handleError( error: any ): any {
        this.tickets = undefined;
        return error;
    }
}
