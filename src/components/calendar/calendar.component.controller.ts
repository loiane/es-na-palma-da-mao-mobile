import IonicLoadingService = ionic.loading.IonicLoadingService;
import {IScope, IPromise} from 'angular';
import CalendarApiService from './shared/calendar-api.service';

interface Calendar {
    currentDate?:Date;
    eventSources?:any[];
}

class CalendarController {

    static $inject:string[] = [ '$scope', 'calendarApiService', '$ionicLoading' ];

    private calendar:Calendar = {};
    private selectedCalendars = [];
    private availableCalendars = [];
    private viewTitle:string = '';

    /**
     * @constructor
     *
     * @param {Object} $scope
     * @param {CalendarApiService} calendarApiService - calendarApiService service
     * @param {IonicLoadingService} $ionicLoading - ionic $ionicLoading service
     */
    constructor( private $scope:IScope,
                 private calendarApiService:CalendarApiService,
                 private $ionicLoading:IonicLoadingService ) {
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }

    /**
     * Ativa o component
     *
     * @returns {void}
     */
    public activate():void {
        this.showLoading()
            .then( () => this.getAvailableCalendars() )
            .then( availableCalendars => this.loadEvents( availableCalendars ) )
            .finally( () => this.hideLoading() );
    }

    /**
     *
     * @param delay
     * @returns {any}
     */
    public showLoading( delay = 0 ) {
        return this.$ionicLoading.show( { delay: delay } );
    }

    /**
     *
     * @returns {any}
     */
    public hideLoading() {
        return this.$ionicLoading.hide();
    }

    /**
     * Carrega lista de calendars disponíveis
     *
     * @returns {*}
     */
    public getAvailableCalendars() {
        return this.calendarApiService.getAvailableCalendars()
                   .then( calendars => {
                       this.selectedCalendars = this.availableCalendars = calendars.map( calendar => calendar.name );
                       return this.selectedCalendars;
                   } );
    }

    /**
     * Carrega os eventos no calendário
     */
    public loadEvents( selectedCalendars:string[] ) {
        return this.showLoading( 200 )
                   .then( () => this.calendarApiService.getFullCalendars( selectedCalendars ) )
                   .then( calendars => {
                       this.calendar.eventSources = calendars;
                       return calendars;
                   } )
                   .finally( () => this.hideLoading() );
    }

    /**
     * Evento disparado quando título do calendário é alterado
     *
     * @param {String} title - o novo title do calendário
     *
     * @returns {void}
     */
    public onViewTitleChanged( title ):void {
        this.viewTitle = title;
    }

    /**
     * Altera a data do calendário para a data corrente (hoje e agora)
     *
     * @returns {void}
     */
    public today():void {
        this.calendar.currentDate = new Date();
    }

    /**
     * Indica se a data selecionada no calendário é a data corrente
     *
     * @param {String} title - o novo title do calendário
     *
     * @returns {boolean} - true ou false dependendo se a data selecionada no calendário é a data corrente
     */
    public isToday():boolean {
        let today = new Date();
        let currentCalendarDate = new Date( this.calendar.currentDate );

        today.setHours( 0, 0, 0, 0 );
        currentCalendarDate.setHours( 0, 0, 0, 0 );

        return today.getTime() === currentCalendarDate.getTime();
    }
}

export default CalendarController;
