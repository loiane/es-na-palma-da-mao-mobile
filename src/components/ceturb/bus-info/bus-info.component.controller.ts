import { IScope, IPromise } from 'angular';
import {IStateService} from 'angular-ui-router';

import { CeturbApiService } from '../shared/ceturb-api.service';
import { BusLine, BusRoute, BusSchedule } from '../shared/models/index';

export class BusInfoController {

    public static $inject: string[] = [
        '$scope',
        '$stateParams',
        'ceturbApiService'
    ];

    private id: string;
    private route: BusRoute = undefined;
    private schedule: BusSchedule = undefined;

    /**
     * Creates an instance of SepConsultaController.
     * @constructor
     * @param {IScope} $scope
     * @param {SepApiService} sepApiService
     */
    constructor( private $scope: IScope,
        private $stateParams: IStateService,
        private ceturbApiService: CeturbApiService ) {
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }

    /**
     *
     */
    public activate(): void {
        this.getRoute( this.$stateParams.id );
        this.getSchecule( this.$stateParams.id );
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
