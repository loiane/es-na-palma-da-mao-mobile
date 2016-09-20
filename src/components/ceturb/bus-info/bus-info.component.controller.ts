import { IScope, IPromise, IWindowService, IQService } from 'angular';

import { CeturbApiService } from '../shared/ceturb-api.service';
import { BusRoute, BusSchedule } from '../shared/models/index';

export class BusInfoController {

    public static $inject: string[] = [
        '$scope',
        '$stateParams',
        '$q',
        '$window',
        '$ionicTabsDelegate',
        'ceturbApiService'
    ];

    public route: BusRoute | undefined = undefined;
    public schedule: BusSchedule | undefined = undefined;
    public currentTime: string;

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
        private $ionicTabsDelegate: any,
        private ceturbApiService: CeturbApiService ) {
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }

    /**
     *
     */
    public activate(): void {
        this.currentTime = new Date().toTimeString().slice( 0, 5 );
        this.$q.all( [
            this.getSchedule( this.$stateParams[ 'id' ] ),
            this.getRoute( this.$stateParams[ 'id' ] )
        ] );
    }

    /**
     * 
     * 
     * @private
     * @param {string} time
     * @returns
     */
    public beforeNow( time: string ): boolean {
        return time.slice( 0, 5 ).localeCompare( this.currentTime ) === -1;
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
     * @param {string} tabIndex
     * 
     * @memberOf BusInfoController
     */
    public gotoTab( tabIndex: string ) {
        if ( tabIndex !== this.$ionicTabsDelegate.selectedIndex() ) {
            this.$ionicTabsDelegate.select( tabIndex );
        }
    }

    /**
     * 
     * 
     * @param {string} id
     */
    public getRoute( id: string ): IPromise<BusRoute | undefined> {
        return this.ceturbApiService.getRoute( id )
            .then( route => this.route = route )
            .catch(() => this.route = undefined );
    }


    /**
     * 
     * 
     * @param {string} id
     */
    public getSchedule( id: string ): IPromise<BusSchedule | undefined> {
        return this.ceturbApiService.getSchedule( id )
            .then( schedule => this.schedule = schedule )
            .catch(() => this.schedule = undefined );
    }
}
