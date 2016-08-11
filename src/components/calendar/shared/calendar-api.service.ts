import { IHttpService, IPromise } from 'angular';
import { Calendar } from './models/calendar';
import { ISettings } from '../../shared/settings/index';

export class CalendarApiService {

    public static $inject: string[] = [ '$http', 'settings' ];

    private calendarsEndPoint: string;
    private eventsEndPoint: string;

    /**
     * Creates an instance of CalendarApiService.
     * 
     * @param {IHttpService} $http
     * @param {ISettings} settings
     */
    constructor( private $http: IHttpService,
                 private settings: ISettings ) {
        this.calendarsEndPoint = settings.api.calendars;
        this.eventsEndPoint = `${settings.api.calendars}/events`;
    }

    /**
     *
     * @returns {*}
     */
    public getAvailableCalendars(): IPromise<{ name: string, color: string}[]> {
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
    public getFullCalendars( calendars: string[] = [], filter = {} ): IPromise<Calendar[]> {
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
