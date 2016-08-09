import { CalendarApiService } from './calendar-api.service';

export default angular.module( 'calendar.shared', [] )
                      .service( 'calendarApiService', CalendarApiService );


export * from './models/index';
export * from './calendar-api.service';