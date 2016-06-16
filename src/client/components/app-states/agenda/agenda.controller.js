class AgendaController {

    /**
     * @constructor
     *
     * @param {Object} toast - toast service
     * @param {Object} $state - ui-router $state service
     */
    constructor( toast ) {
        this.toast = toast;
        this.name = 'home';
        this.calendar = {};
        this.numberOfEvents = 0;
        this.colors = new Array( 100 );
        this.eventSources = [
            { summary: 'SEFAZ' },
            { summary: 'SEGER' },
            { summary: 'SEJUS' },
            { summary: 'PRODEST' },
            { summary: 'SECONT' },
            { summary: 'SECULT' },
            { summary: 'SEDU' },
            { summary: 'SESA' }
        ];
        this.activate();
    }

    /**
     * Ativa o controller
     *
     * @returns {void}
     */
    activate() {
        for ( let i = 0; i < this.colors.length; i += 1 ) {
            this.colors[ i ] = '#' + ( Math.random() * 0xFFFFFF << 0 ).toString( 16 );
        }
    }

    /**
     * Carrega os eventos no calendário
     */
    loadEvents() {
        this.eventSources.forEach( source => {
            source.color = this.colors[ Math.floor( Math.random() * ( ( this.colors.length - 1 ) - 0 + 1 ) ) ];
            source.items = createRandomEvents( source.summary, Math.floor( Math.random() * 50 ), source.color );
            source.etag = guid();

            this.numberOfEvents += source.items.length;
        } );
        this.calendar.eventSources = angular.copy( this.eventSources );

        this.toast.show( { title: `${this.numberOfEvents} eventos carregados` } );
    }

    /**
     * Evento disparado quando evento é selecionado
     * @param {Object} event - o evento selecionado
     *
     * @returns {void}
     */
    onEventSelected( event ) {
        this.toast.show( { title: `Evento ${event.startTime}-${event.endTime},${event.title} selecionado` } );
    };

    /**
     * Evento disparado quando título do calendário é alterado
     *
     * @param {String} title - o novo title do calendário
     *
     * @returns {void}
     */
    onViewTitleChanged( title ) {
        this.viewTitle = title;
    };

    /**
     * Altera a data do calendário para a data corrente (hoje e agora)
     *
     * @returns {void}
     */
    today() {
        this.calendar.currentDate = new Date();
    }

    /**
     * Indica se a data selecionada no calendário é a data corrente
     *
     * @param {String} title - o novo title do calendário
     *
     * @returns {Bool} - true ou false dependendo se a data selecionada no calendário é a data corrente
     */
    isToday() {
        let today = new Date();
        let currentCalendarDate = new Date( this.calendar.currentDate );

        today.setHours( 0, 0, 0, 0 );
        currentCalendarDate.setHours( 0, 0, 0, 0 );
        return today.getTime() === currentCalendarDate.getTime();
    }

    /**
     * Evento disparado uma data é selecionada no calendário
     *
     * @param {String} selectedTime - a data selecionada no calendário
     *
     * @returns {void}
     */
    onTimeSelected( selectedTime ) {
        this.toast.show( { title: `Dia selecionado: ${selectedTime}` } );
    }
}

export default [ 'toast', '$state', AgendaController ];

///////////////////////////////////////////////////////////////////////

/**
 *
 * @returns {string}
 */
function guid() {
    function s4() {
        return Math.floor( ( 1 + Math.random() ) * 0x10000 )
                   .toString( 16 )
                   .substring( 1 );
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

/**
 *
 * @param source
 * @param numOfEvents
 * @param color
 * @returns {Array}
 */
function createRandomEvents( source, numOfEvents, color ) {
    let events = [];
    let date;
    let startDay;
    let endDay;
    let startTime;
    let endTime;
    let i;
    let startMinute;
    let endMinute;

    for ( i = 0; i < numOfEvents; i += 1 ) {
        date = new Date();
        startDay = Math.floor( Math.random() * 90 ) - 45;
        endDay = Math.floor( Math.random() * 2 ) + startDay;
        startMinute = Math.floor( Math.random() * 24 * 60 );
        endMinute = Math.floor( Math.random() * 180 ) + startMinute;
        startTime = new Date( date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute );
        endTime = new Date( date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute );
        events.push( {
            id: guid(),
            etag: guid(),
            summary: source + ' - Event ' + i,
            start: { dateTime: startTime },
            end: { dateTime: endTime },
            color: color
        } );

    }
    return events;
}




