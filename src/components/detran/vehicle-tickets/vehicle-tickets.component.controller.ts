import moment from 'moment';
import { IScope, IPromise } from 'angular';
import { Ticket, Vehicle, DetranApiService } from '../shared/index';


/**
 * @class DriverLicenseStatusController
 */
export class VehicleTicketsController {

    public static $inject: string[] = [ '$scope', '$stateParams', 'detranApiService' ];

    /**
     * Lista de multas
     * 
     * @type {Ticket[]}
     */
    public tickets: Ticket[] = [];
    public vehicle: Vehicle;
    public ticketsPopulated: Boolean = false;

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

    /**
     * Creates an instance of VehicleTicketsController.
     * 
     * @param {IScope} $scope
     * @param {angular.ui.IStateService} $stateParams
     * @param {DetranApiService} detranApiService
     */
    constructor( private $scope: IScope,
                 private $stateParams: angular.ui.IStateService,
                 private detranApiService: DetranApiService ) {
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );

        this.vehicle = {
            placa: this.$stateParams.placa,
            renavam: this.$stateParams.renavam
        };
    }


    /**
     * Preenche a página com dados do condutor, bem como de suas eventuais multas.
     */
    public activate(): void {
        this.getTickets();
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
     * Obtem as eventuais multas pertencentes ao condutor autenticado no sistema.
     * 
     * @returns {IPromise<Ticket[]>}
     */
    public getTickets(): IPromise<Ticket[]> {
        return this.detranApiService.getTickets()
            .then( tickets => {
                this.tickets = tickets || [];
                this.ticketsPopulated = true;
                return this.tickets;
            });
    }
}
