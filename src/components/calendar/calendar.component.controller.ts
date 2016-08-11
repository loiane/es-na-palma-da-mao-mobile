import { IScope, IPromise } from 'angular';
import { CalendarApiService } from './shared/calendar-api.service';
import { Calendar, Event } from './shared/models/index';

export class CalendarController {

    public static $inject: string[] = [ '$scope', 'calendarApiService', '$ionicLoading' ];

    private calendar: { currentDate?: Date; eventSources?: Calendar[]; } = {};
    private selectedCalendars: string[] = [];
    private availableCalendars: string[] = [];
    private viewTitle: string = '';

    /**
     * @constructor
     *
     * @param {Object} $scope
     * @param {CalendarApiService} calendarApiService - calendarApiService service
     * @param {IonicLoadingService} $ionicLoading - ionic $ionicLoading service
     */
    constructor( private $scope: IScope,
                 private calendarApiService: CalendarApiService,
                 private $ionicLoading: ionic.loading.IonicLoadingService ) {
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }

    /**
     * Ativa o component
     *
     * @returns {void}
     */
    public activate(): void {
        this.$ionicLoading.show()
            .then(() => this.getAvailableCalendars() )
            .then( availableCalendars => this.loadCalendars( availableCalendars ) )
            .finally( () => this.$ionicLoading.hide() );
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
        return this.$ionicLoading.show()
                   .then(() => this.calendarApiService.getFullCalendars( selectedCalendars ) )
                   .then( calendars => {
                       this.calendar.eventSources = calendars;
                       return calendars;
                   })
                   .finally( () => this.$ionicLoading.hide() );
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

