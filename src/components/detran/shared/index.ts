import { DetranApiService } from './detran-api.service';
import { DetranStorage } from './detran-storage.service';
import { TicketColorService } from './ticket-color.service';

export default angular.module( 'detran.shared', [] )
                      .service( 'detranApiService', DetranApiService )
                      .service( 'ticketColorService', TicketColorService )
                      .service( 'detranStorage', DetranStorage );

export * from './detran-api.service';
export * from './models/index';
export * from './detran-storage.service';
export * from './ticket-color.service';
