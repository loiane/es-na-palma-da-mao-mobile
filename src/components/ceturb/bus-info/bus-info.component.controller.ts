import { IScope, IPromise } from 'angular';

import { CeturbApiService } from '../shared/ceturb-api.service';
import { BusLine, BusRoute, BusSchedule } from '../shared/models/index';

export class BusInfoController {

    public static $inject: string[] = [
        '$scope',
        'ceturbApiService'
    ];

    private id: string;
    private route: BusRoute;
    private schedule: BusSchedule;
    private populated: boolean;


    /**
     * Creates an instance of SepConsultaController.
     * @constructor
     * @param {IScope} $scope
     * @param {SepApiService} sepApiService
     */
    constructor( private $scope: IScope,
        private ceturbApiService: CeturbApiService ) {
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }

    /**
     *
     */
    public activate(): void {
        this.route = undefined;
        this.schedule = undefined;
        this.populated = false;
    }


    public getRoute( id: string ): void {
        this.ceturbApiService.getRoute( id )
            .subscribe( routes => this.route = routes, error => this.route = undefined );
    }

    public getSchecule( id: string ): void {
        this.ceturbApiService.getSchecule( id )
            .subscribe( schedule => this.schedule = schedule, error => this.schedule = undefined );
    }
}
