import { IScope, IPromise } from 'angular';
import { SourcesFilterController, sourcesFilterTemplate } from '../layout/sources-filter/index';
import { CalendarApiService } from './shared/calendar-api.service';
import { Calendar } from './shared/models/index';

export class CalendarController {

    public static $inject: string[] = [ '$scope', '$mdDialog', 'calendarApiService' ];

    public calendar: { currentDate?: Date; eventSources?: Calendar[]; } = {};
    public selectedCalendars: string[] = [];
    public availableCalendars: string[] = [];
    public viewTitle: string = '';

    /**
     * @constructor
     *
     * @param {Object} $scope
     * @param {CalendarApiService} calendarApiService - calendarApiService service
     */
    constructor( private $scope: IScope,
        private $mdDialog: angular.material.IDialogService,
        private calendarApiService: CalendarApiService ) {
        this.$scope.$on( '$ionicView.loaded', () => this.activate() );
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
                this.availableCalendars = calendars.map( calendar => calendar.name );
                this.selectedCalendars = angular.copy( this.availableCalendars );
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
        let currentCalendarDate = new Date( this.calendar.currentDate! );

        today.setHours( 0, 0, 0, 0 );
        currentCalendarDate.setHours( 0, 0, 0, 0 );

        return today.getTime() === currentCalendarDate.getTime();
    }


    /**
   * Abre filtro(popup) por fonte da notícia
   */
    public openFilter(): void {
        this.$mdDialog.show( {
            controller: SourcesFilterController,
            template: sourcesFilterTemplate,
            bindToController: true,
            controllerAs: 'vm',
            locals: {
                availableOrigins: this.availableCalendars,
                selectedOrigins: this.selectedCalendars
            }
        })
            .then(( filter: { origins: string[] }) => {
                this.selectedCalendars = filter.origins;
                this.loadCalendars( this.selectedCalendars );
            });
    }
}


