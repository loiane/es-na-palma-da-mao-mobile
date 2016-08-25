import { IHttpService, IPromise } from 'angular';
import { TeamMember } from './models/index';
import { ISettings } from '../../shared/settings/index';

export class TeamsApiService {

    public static $inject: string[] = [ '$http', 'settings' ];

    /**
     * Creates an instance of CalendarApiService.
     * 
     * @param {IHttpService} $http
     * @param {ISettings} settings
     */
    constructor( private $http: IHttpService,
                 private settings: ISettings ) {
    }

    /**
     *
     * @returns {*}
     */
    public getTeamMembers(): IPromise<TeamMember[]> {
        return this.$http
                   .get( 'https://api.es.gov.br/espm/about/team' )
                   .then( response => response.data );
    }
}
