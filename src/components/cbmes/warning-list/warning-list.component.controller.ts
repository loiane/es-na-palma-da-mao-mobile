import { IScope, IPromise } from 'angular';

import { CbmesApiService, Warning } from '../shared/index';

export class WarningListController {

    public static $inject: string[] = [
        '$scope',
        '$state',
        '$ionicLoading',
        'cbmesApiService'
    ];

    private levels: any = [ 'alto', 'medio', 'baixo' ];
    private warnings: Warning[] = [];
    private activated: boolean = false;
    private populated: boolean = false;

    constructor( private $scope: IScope,
        private $state: angular.ui.IStateService,
        private $ionicLoading: ionic.loading.IonicLoadingService,
        private cbmesApiService: CbmesApiService ) {
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }

    /**
     * Ativa o controller
     */
    public activate(): void {
        this.getWarnings()
            .finally(() => this.populated = true );
    }

    /**
     * Retorna os alertas dos últimos 7 dias 
     * 
     * @returns {IPromise<Warning[]>}
     */
    public getWarnings(): IPromise<Warning[]> {
        return this.cbmesApiService.getLastWarnings()
            .then( warnings => this.warnings = warnings );
    }

    public openLocation( lat: number, lng: number, label: string ) {
        let geocoords = lat + ',' + lng;

        if ( this.$scope.isAndroid ) {
            window.open( 'geo:0,0?q=' + geocoords + '(' + encodeURI( label ) + ')', '_system' );
        } else {
            window.open( 'maps://?q=' + geocoords, '_system' );
        }
    }
}
