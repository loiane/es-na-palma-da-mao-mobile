import { IHttpService, IPromise } from 'angular';
import { Calendar } from './models/calendar';
import { ISettings } from '../../shared/settings/index';

export class CalendarApiService {

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
    public getAvailableCalendars(): IPromise<{ name: string, color: string}[]> {
        return this.$http
                   .get( this.settings.api.calendars )
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
            timeZone: 'America/Sao_Paulo',
            calendars: calendars
        };
        return this.$http.get( `${this.settings.api.calendars}/events`, { params: angular.extend( defaults, filter ) } )
                   .then( response => response.data );
    }
}

