import {IHttpService, IPromise} from 'angular';

class CalendarApiService {

    static $inject:string[] = [ '$http', 'settings' ];

    private calendarsEndPoint:string;
    private eventsEndPoint:string;

    /**
     * @constructor
     *
     * @param {IHttpService} $http - angular $http service
     * @param settings
     */
    constructor( private $http:IHttpService,
                 private settings ) {
        this.calendarsEndPoint = settings.api.calendars;
        this.eventsEndPoint = `${settings.api.calendars}/events`;
    }

    /**
     *
     * @returns {*}
     */
    public getAvailableCalendars():IPromise<any> {
        return this.$http
                   .get( this.calendarsEndPoint )
                   .then( response => response.data );
    }

    /**
     *
     * @param calendars
     * @param filter
     * @returns {Array}
     */
    public getFullCalendars( calendars:string[] = [], filter = {} ):IPromise<any> {
        let today = new Date();
        let defaults = {
            singleEvents: true,
            orderBy: 'startTime',
            timeMin: new Date( today.getFullYear(), 0, 1, 0 ),   // começo do ano corrente
            timeMax: new Date( today.getFullYear(), 11, 31, 0 ), // final do ano corrente
            timeZone: 'America/Sao_Paulo' // an option!
        };
        return this.$http.get( this.eventsEndPoint, { params: angular.extend( { calendars: calendars }, defaults, filter ) } )
                   .then( response => response.data );
    }
}

export default CalendarApiService;
