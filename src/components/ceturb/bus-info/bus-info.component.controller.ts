import { IScope, IPromise, IWindowService, IQService } from 'angular';
import { IStateService } from 'angular-ui-router';

import { CeturbApiService } from '../shared/ceturb-api.service';
import { BusLine, BusRoute, BusSchedule } from '../shared/models/index';

export class BusInfoController {

    public static $inject: string[] = [
        '$scope',
        '$stateParams',
        '$q',
        '$window',
        '$ionicLoading',
        'ceturbApiService'
    ];

    private id: string;
    private route: BusRoute = undefined;
    private schedule: BusSchedule = undefined;
    private currentDate: Date = new Date();
    private strCurrentDate: string;

    /**
     * Creates an instance of BusInfoController.
     * 
     * @param {IScope} $scope
     * @param {IStateService} $stateParams
     * @param {IQService} $q
     * @param {IWindowService} $window
     * @param {ionic.loading.IonicLoadingService} $ionicLoading
     * @param {CeturbApiService} ceturbApiService
     */
    constructor( private $scope: IScope,
                 private $stateParams: IStateService,
                 private $q: IQService,
                 private $window: IWindowService,
                 private $ionicLoading: ionic.loading.IonicLoadingService,
                 private ceturbApiService: CeturbApiService ) {
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }

    /**
     *
     */
    public activate(): void {

        this.$ionicLoading.show();
        this.$q.all( [ this.getSchedule( this.$stateParams.id ), this.getRoute( this.$stateParams.id ) ] )
               .finally( () => this.$ionicLoading.hide() );

        this.strCurrentDate = this.currentDate.toTimeString().slice( 0, 5 );
    }

    /**
     * 
     * 
     * @private
     * @param {string} time
     * @returns
     */
    private beforeNow( time: string ) {
        return time.localeCompare( this.strCurrentDate ) === -1;
    }


    /**
     * 
     * 
     * @private
     * @param {string} text
     */
    private openMapLink( text: string ) {
        this.$window.open( `http://www.google.com.br/maps/place/${text}`, '_system', 'location=yes' );
    }


    /**
     * 
     * 
     * @param {string} id
     */
    public getRoute( id: string ): IPromise<BusRoute> {
        return this.ceturbApiService.getRoute( id )
                   .then( routes => this.route = routes)
                   .catch( error => this.route = undefined );
    }


    /**
     * 
     * 
     * @param {string} id
     */
    public getSchedule( id: string ): IPromise<BusSchedule> {
        return this.ceturbApiService.getSchedule( id )
                   .then( schedule => this.schedule = schedule)
                   .catch( error => this.schedule = undefined );
    }
}
