import { IScope, IPromise, IWindowService } from 'angular';
import { TeamsApiService, TeamMember, Project } from './shared/index';
import packageJson from '../../package.json!';
import logoProdest from '../shared/img/prodest-logo.png!image';

export class AboutController {

    public static $inject: string[] = [ '$scope', '$window', 'teamsApiService', '$ionicLoading' ];

    private teamMembers: TeamMember[] = [];
    private project: Project = packageJson;

    /**
     * Creates an instance of AboutController.
     * 
     * @param {IScope} $scope
     * @param {IWindowService} $window
     * @param {TeamsApiService} teamsApiService
     * @param {ionic.loading.IonicLoadingService} $ionicLoading
     */
    constructor( private $scope: IScope,
                 private $window: IWindowService,
                 private teamsApiService: TeamsApiService,
                 private $ionicLoading: ionic.loading.IonicLoadingService ) {
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }

    /**
     * 
     * 
     * @readonly
     * @type {string}
     */
    public get logoUrl(): string {
        return logoProdest.src;
    }

    /**
     * Ativa o component
     *
     * @returns {void}
     */
    public activate(): void {
        this.getTeamMembers();
    }

    /**
     * 
     * 
     * @returns {IPromise<string[]>}
     */
    public getTeamMembers(): IPromise<TeamMember[]> {
        return this.teamsApiService.getTeamMembers()
                                   .then( teamMembers => {
                                        this.teamMembers = teamMembers;
                                        return this.teamMembers;
                                    } );
    }

    /**
     * 
     * 
     * @param {string} url
     */
    public openUrl( url: string ): void {
        this.$window.open( url, '_system' );
    }
}

