import { IScope, IPromise } from 'angular';
import { IStateService } from 'angular-ui-router';

import { CbmesApiService } from '../shared/index';

export class WarningListController {

    public static $inject: string[] = [
        '$scope',
        '$state',
        '$mdDialog',
        '$ionicLoading',
        'newsApiService',
        '$ionicScrollDelegate'
    ];

    private warning: Warning[] = [];
    private activated = false;
    private populated = false;

    constructor( private $scope: IScope,
                 private $state: IStateService,
                 private $ionicLoading: ionic.loading.IonicLoadingService,
                 private cbmesApiService: CbmesApiService ) {
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }

    /**
     * Ativa o controller
     */
    public activate(): void {
        this.getLastWarnings()
            .finally( () => {
                this.activated = true;
            } );
    }

    /**
     * Obtém uma lista de notícias
     */
    public getLastWarnings( ): IPromise<Warning[]> {

        return this.cbmesApiService.getLastWarnings( )
                                    .then( warnings => {
                                        this.warnings = warnings;
                                        this.populated = true;
                                    } );
    }

    /**
     * Navega para um notícia
     * 
     * @param {string} id
     */
    public goToWarning( id: string ): void {
        this.$state.go( 'app.warning/:id', { id: id } );
    }
}
