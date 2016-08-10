import { IScope, IPromise, IWindowService } from 'angular';
import { Edition, DioApiService } from '../shared//index';

export class LatestController {

    public static $inject: string[] = [
        '$scope',
        '$window',
        '$ionicLoading',
        'dioApiService'
    ];

    private latestEditions: string[] = [];
    private activated = false;

    /**
     * Creates an instance of LatestController.
     * 
     * @param {IScope} $scope
     * @param {IWindowService} $window
     * @param {ionic.loading.IonicLoadingService} $ionicLoading
     * @param {DioApiService} dioApiService
     */
    constructor( private $scope: IScope,
        private $window: IWindowService,
        private $ionicLoading: ionic.loading.IonicLoadingService,
        private dioApiService: DioApiService ) {
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }

    /**
     * Ativa o controller
     */
    public activate(): void {
        this.getLatestEditions()
            .finally( () => {
                this.activated = true;
            } );
    }

    /**
     * Carrega lista de origins disponíveis
     *
     * @returns {*}
     */
    public getLatestEditions(): IPromise<Edition[]> {
        this.$ionicLoading.show();
        return this.dioApiService.getLatestEditions()
            .then( editions => {
                this.latestEditions = editions;
                return editions;
            } )
            .finally( () => {
                this.$ionicLoading.hide();
            } );
    }

    /**
     * 
     * 
     * @param {string} url
     */
    public openEdition( url: string ): void {
        this.$window.open( url, '_system' );
    }
}
