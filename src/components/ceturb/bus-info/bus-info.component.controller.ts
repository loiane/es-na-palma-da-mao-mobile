import { IScope, IPromise, IWindowService, IQService } from 'angular';

import { CeturbApiService } from '../shared/ceturb-api.service';
import { BusRoute, BusSchedule } from '../shared/models/index';

export class BusInfoController {

    public static $inject: string[] = [
        '$scope',
        '$stateParams',
        '$q',
        '$window',
        'ceturbApiService'
    ];

    private route: BusRoute | undefined = undefined;
    private schedule: BusSchedule | undefined = undefined;
    private currentDate: Date = new Date();
    private strCurrentDate: string;

    /**
     * Creates an instance of BusInfoController.
     * 
     * @param {IScope} $scope
     * @param {angular.ui.IStateParamsService} $stateParams
     * @param {IQService} $q
     * @param {IWindowService} $window
     * @param {CeturbApiService} ceturbApiService
     */
    constructor( private $scope: IScope,
                 private $stateParams: angular.ui.IStateParamsService,
                 private $q: IQService,
                 private $window: IWindowService,
                 private ceturbApiService: CeturbApiService ) {
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }

    /**
     *
     */
    public activate(): void {

        this.$q.all( [ this.getSchedule( this.$stateParams[ 'id' ] ), this.getRoute( this.$stateParams[ 'id' ]  ) ] );

        this.strCurrentDate = this.currentDate.toTimeString().slice( 0, 5 );
    }

    /**
     * 
     * 
     * @private
     * @param {string} time
     * @returns
     */
    public beforeNow( time: string ): boolean {
        return time.localeCompare( this.strCurrentDate ) === -1;
    }


    /**
     * 
     * 
     * @private
     * @param {string} text
     */
    public openMapLink( text: string ): void {
        this.$window.open( `http://www.google.com.br/maps/place/${text}, ES`, '_system', 'location=yes' );
    }


    /**
     * 
     * 
     * @param {string} id
     */
    public getRoute( id: string ): IPromise<BusRoute | undefined> {
        return this.ceturbApiService.getRoute( id )
                   .then( routes => this.route = routes)
                   .catch( () => this.route = undefined );
    }


    /**
     * 
     * 
     * @param {string} id
     */
    public getSchedule( id: string ): IPromise<BusSchedule | undefined> {
        return this.ceturbApiService.getSchedule( id )
                   .then( schedule => this.schedule = schedule)
                   .catch( () => this.schedule = undefined );
    }
}
