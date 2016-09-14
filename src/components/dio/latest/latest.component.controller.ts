import { IScope, IPromise, IWindowService } from 'angular';
import { Edition, DioApiService } from '../shared/index';

export class LatestController {

    public static $inject: string[] = [
        '$scope',
        '$window',
        'dioApiService'
    ];

    public latestEditions: Edition[] = [];

    /**
     * Creates an instance of LatestController.
     * 
     * @param {IScope} $scope
     * @param {IWindowService} $window
     * @param {DioApiService} dioApiService
     */
    constructor( private $scope: IScope,
        private $window: IWindowService,
        private dioApiService: DioApiService ) {
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }

    /**
     * Ativa o controller
     */
    public activate(): void {
        this.getLatestEditions();
    }

    /**
     * Carrega lista de origins disponíveis
     *
     * @returns {*}
     */
    public getLatestEditions(): IPromise<Edition[]> {
        return this.dioApiService.getLatestEditions()
            .then( editions => {
                this.latestEditions = editions;
                return editions;
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
