import { IScope, IPromise } from 'angular';
import { CalendarApiService } from './shared/calendar-api.service';
import { Calendar, Event } from './shared/models/index';

export class CalendarController {

    public static $inject: string[] = [ '$scope', 'calendarApiService' ];

    private calendar: { currentDate?: Date; eventSources?: Calendar[]; } = {};
    private selectedCalendars: string[] = [];
    private availableCalendars: string[] = [];
    private viewTitle: string = '';

    /**
     * @constructor
     *
     * @param {Object} $scope
     * @param {CalendarApiService} calendarApiService - calendarApiService service
     */
    constructor( private $scope: IScope,
        private calendarApiService: CalendarApiService ) {
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }

    /**
     * 
     * 
     * @readonly
     * @type {boolean}
     */
    public get calendarsPopulated(): boolean {
        return angular.isDefined( this.calendar.eventSources );
    }

    /**
     * Ativa o component
     *
     * @returns {void}
     */
    public activate(): void {
        this.getAvailableCalendars()
            .then( availableCalendars => this.loadCalendars( availableCalendars ) );
    }

    /**
     * Carrega lista de calendários disponíveis
     *
     * @returns {*}
     */
    public getAvailableCalendars(): IPromise<string[]> {
        return this.calendarApiService.getAvailableCalendars()
            .then( calendars => {
                this.selectedCalendars = this.availableCalendars = calendars.map( calendar => calendar.name );
                return this.selectedCalendars;
            });
    }

    /**
     * Carrega os eventos dos calendários selecionados
     */
    public loadCalendars( selectedCalendars: string[] ): IPromise<Calendar[]> {
        return this.calendarApiService.getFullCalendars( selectedCalendars )
            .then( calendars => {
                this.calendar.eventSources = calendars;
                return calendars;
            });
    }

    /**
     * Evento disparado quando título do calendário é alterado
     *
     * @param {String} title - o novo title do calendário
     *
     * @returns {void}
     */
    public onViewTitleChanged( title: string ): void {
        this.viewTitle = title;
    }

    /**
     * Altera a data do calendário para a data corrente (hoje e agora)
     *
     * @returns {void}
     */
    public today(): void {
        this.calendar.currentDate = new Date();
    }

    /**
     * Indica se a data selecionada no calendário é a data corrente
     *
     * @param {String} title - o novo title do calendário
     *
     * @returns {boolean} - true ou false dependendo se a data selecionada no calendário é a data corrente
     */
    public isToday(): boolean {
        let today = new Date();
        let currentCalendarDate = new Date( this.calendar.currentDate );

        today.setHours( 0, 0, 0, 0 );
        currentCalendarDate.setHours( 0, 0, 0, 0 );

        return today.getTime() === currentCalendarDate.getTime();
    }
}

