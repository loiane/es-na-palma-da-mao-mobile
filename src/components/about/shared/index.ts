import { TeamsApiService } from './teams-api.service';

export * from './models/index';
export * from './teams-api.service'

export default angular.module( 'about.shared', [] )
                      .service( 'teamsApiService', TeamsApiService );