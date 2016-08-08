import { IScope, IPromise, IWindowService } from 'angular';
import { IStateService } from 'angular-ui-router';

import { CeturbApiService } from '../shared/ceturb-api.service';
import { BusLine, BusRoute, BusSchedule } from '../shared/models/index';

export class BusInfoController {

    public static $inject: string[] = [
        '$scope',
        '$stateParams',
        '$window',
        'ceturbApiService'
    ];

    private id: string;
    private route: BusRoute = undefined;
    private schedule: BusSchedule = undefined;
    private currentDate: Date = new Date();
    private strCurrentDate: string;

    /**
     * Creates an instance of SepConsultaController.
     * @constructor
     * @param {IScope} $scope
     * @param {SepApiService} sepApiService
     */
    constructor( private $scope: IScope,
        private $stateParams: IStateService,
        private $window: IWindowService,
        private ceturbApiService: CeturbApiService ) {
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }

    /**
     *
     */
    public activate(): void {
        this.getRoute( this.$stateParams.id );
        this.getSchecule( this.$stateParams.id );
        this.strCurrentDate = this.currentDate.toTimeString().slice(0, 5);
    }

    private beforeNow( time: string ) {
        return time.localeCompare( this.strCurrentDate ) === -1;
    }

    private openMapLink( text: string ) {
        this.$window.open( `http://www.google.com.br/maps/place/${text}`, '_system', 'location=yes' );
    }

    public getRoute( id: string ): void {
        this.ceturbApiService.getRoute( id )
            .then( routes => this.route = routes)
            .catch( error => this.route = undefined );
    }

    public getSchecule( id: string ): void {
        this.ceturbApiService.getSchecule( id )
            .then( schedule => this.schedule = schedule)
            .catch( error => this.schedule = undefined );
    }
}
