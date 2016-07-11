import {IScope, IWindowService} from 'angular';
import {IStateService} from 'angular-ui-router';
import {scroll} from 'ionic';

import SepApiService from './shared/sep-api.service';

interface Process {
    updates?:any[]
}

class SepConsultaController {

    static $inject:string[] = [
        '$window',
        '$scope',
        '$state',
        '$mdDialog',
        '$ionicScrollDelegate',
        'sepApiService'
    ];

    private seeMoreUpdates:string = 'VER MAIS';
    private processNumber:string = '';
    private process:Process = undefined;
    private populated:boolean = false;
    private showAllUpdates:boolean = false;

    /**
     * @constructor
     *
     * @param {IWindowService} $scope: $scope
     * @param {IScope} $state: $state
     * @param {IStateService} $mdDialog: $mdDialog
     * @param {SepApiService} sepApiService: Api do SEP
     * @return {undefined}
     */
    constructor( private $window:IWindowService,
                 private $scope:IScope,
                 private $state:IStateService,
                 private $mdDialog:angular.material.IDialogService,
                 private $ionicScrollDelegate:scroll.IonicScrollDelegate,
                 private sepApiService:SepApiService ) {
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }

    /**
     *
     */
    public activate():void {
    }

    /**
     *
     * @returns {any}
     */
    public get firstUpdate() {
        if ( this.process && this.process.updates && this.process.updates.length > 0 ) {
            return this.process.updates[ this.process.updates.length - 1 ];
        }
    }

    public get lastUpdate() {
        if ( this.process && this.process.updates && this.process.updates.length > 0 ) {
            return this.process.updates[ 0 ];
        }
    }

    public get hiddenUpdates() {
        if ( this.process && this.process.updates && this.process.updates.length > 0 ) {
            return this.process.updates.slice( 1 );
        }
    }

    public get hasProcess():boolean {
        return angular.isDefined( this.process ) && this.process !== '';
    }

    public toggleUpdates():void {
        this.showAllUpdates = !this.showAllUpdates;

        if ( this.showAllUpdates ) {
            this.seeMoreUpdates = 'OCULTAR';
            this.$ionicScrollDelegate.scrollTo( 0, 300, true ); //TODO: try to search the element to scroll: anchorScroll
        } else {
            this.seeMoreUpdates = 'VER MAIS';
        }
    }

    /**
     * @param {Number} number: Process number
     * @return {undefined}
     */
    public getProcess( number:string ):void {
        this.sepApiService.getProcessByNumber( number )
            .then( process => {
                this.process = process;
                return process;
            } )
            .catch( ()=> {
                this.process = undefined;
            } )
            .finally( ()=> {
                this.populated = true;
            } );
    }
}

export default SepConsultaController;
