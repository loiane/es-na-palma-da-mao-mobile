import calendarApiService from './calendar-api.service';

export default angular.module( 'calendar.shared', [] )
                      .service( 'calendarApiService', calendarApiService );
