import { IHttpService, IPromise } from 'angular';
import { TeamMember } from './models/index';

export class TeamsApiService {

    public static $inject: string[] = [ '$http' ];

    /**
     * Creates an instance of CalendarApiService.
     * 
     * @param {IHttpService} $http
     */
    constructor( private $http: IHttpService ) {
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
