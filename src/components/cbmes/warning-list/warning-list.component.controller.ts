import { IScope, IPromise } from 'angular';

import { CbmesApiService, Warning } from '../shared/index';

export class WarningListController {

    public static $inject: string[] = [
        '$scope',
        '$state',
        'cbmesApiService'
    ];

    private levels: any = [ 'alto', 'medio', 'baixo' ];
    private warnings: Warning[];
    private activated: boolean = false;

    /**
     * Creates an instance of WarningListController.
     * 
     * @param {IScope} $scope
     * @param {angular.ui.IStateService} $state
     * @param {CbmesApiService} cbmesApiService
     */
    constructor( private $scope: IScope,
        private $state: angular.ui.IStateService,
        private cbmesApiService: CbmesApiService ) {
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }

    /**
     * Ativa o controller
     */
    public activate(): void {
        this.getWarnings();
    }

    /**
     * 
     * 
     * @readonly
     */
    public get warningsPopulated() {
        return angular.isDefined( this.warnings );
    }

    /**
     * Retorna os alertas dos últimos 7 dias 
     * 
     * @returns {IPromise<Warning[]>}
     */
    public getWarnings(): void {
         this.cbmesApiService.getLastWarnings()
            .then( warnings => {
                this.warnings = warnings || [];
                return this.warnings;
            });
    }

    /**
     * 
     * 
     * @param {number} lat
     * @param {number} lng
     * @param {string} label
     */
    public openLocation( lat: number, lng: number, label: string ) {
        let geocoords = lat + ',' + lng;

        if ( this.$scope.isAndroid ) {
            window.open( 'geo:0,0?q=' + geocoords + '(' + encodeURI( label ) + ')', '_system' );
        } else {
            window.open( 'maps://?q=' + geocoords, '_system' );
        }
    }
}
