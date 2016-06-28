import calendarApiService from './calendar-api.service.js';

export default angular.module( 'calendar.shared', [] )
                      .service( 'calendarApiService', calendarApiService );
