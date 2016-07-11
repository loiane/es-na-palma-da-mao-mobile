import moment from 'moment';

const classifications = [ { name: 'leve', backGroundClass: 'bg-green' },
    { name: 'média', backGroundClass: 'bg-yellow' },
    { name: 'grave', backGroundClass: 'bg-red' },
    { name: 'gravíssima', backGroundClass: 'bg-black' } ];

/** @class */
class SepConsultaController {

    /**
     * @constructor
     *
     * @param {Object} $scope: $scope
     * @param {Object} $ionicScrollDelegate: $ionicScrollDelegate
     * @param {Object} sepApiService: Api do SEP
     * @return {undefined}
     */
    constructor( $scope, detranApiService ) {
        this.$scope = $scope;
        this.detranApiService = detranApiService;

        this.reset();
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }

    /**
     *
     */
    activate() {
        this.reset();

        this.getDriverData().finally( () => {
            this.driverDataPopulated = true;
        } );
        this.getTickets().finally( () => {
            this.ticketsPopulated = true;
        } );
    }

    reset() {
        this.selectedIndex = -1;
        this.driverData = undefined;
        this.tickets = [];
        this.driverDataPopulated = false;
        this.ticketsPopulated = false;
    }

    get hasData() {
        return angular.isDefined( this.driverData ) && this.driverData !== '';
    }

    get licenseOk() {
        return this.driverData && this.driverData.status == 0;
    }

    get licenseBlocked() {
        return this.driverData && this.driverData.status == 1;
    }

    get licenseExpired() {
        return this.driverData && moment( this.driverData.expirationDate ).add( 1, 'months' ).isBefore( moment() );
    }

    get licenseRenew() {
        return this.driverData
            && moment( this.driverData.expirationDate ).add( 1, 'months' ).isAfter( moment() )
            && moment().isAfter( moment( this.driverData.expirationDate ) );
    }

    get expirationDate() {
        if ( this.driverData ) {
            return moment( this.driverData.expirationDate );
        }
    }

    get hasTickets() {
        return this.tickets.length > 0;
    }

    get last12MonthsPoints() {
        if ( this.tickets ) {
            let points = 0;
            this.tickets.forEach( ( ticket ) => {
                if ( moment( ticket.date ).isAfter( moment().subtract( 1, 'year' ) ) ) {
                    points += ticket.points;
                }
            } );
            return points;
        }
        return 0;
    }

    classificationClass( value ) {
        let classification = classifications.filter( ( i ) => i.name == value.toLowerCase() );
        if ( classification && classification.length == 1 ) {
            return classification[ 0 ].backGroundClass;
        }
    }

    showDetails( $index ) {
        if ( this.selectedIndex !== $index ) {
            this.selectedIndex = $index;
        } else {
            this.selectedIndex = -1;
        }
        //let target = $event.currentTarget;
    }

    /**
     * @param {Number} number: Process number
     * @return {Promisse}
     */
    getDriverData() {
        return this.detranApiService.getDriverData()
            .then( driverData => {
                this.driverData = driverData;
                return;
            } )
            .catch( () => {
                this.driverData = undefined;
                return;
            } );
    }

    /**
     * @param {any} id
     * @return {Promisse}
     */
    getTickets() {
        return this.detranApiService.getTickets()
            .then( tickets => {
                this.tickets = tickets;
                let ticket = {
                    classification: 'GRAVE',
                    date: '2013-09-06T20:12:00-03:00',
                    description: 'ESTACIONAR O VEÍCULO EM LOCAIS E HORÁRIOS PROIBIDOS ESPECIFICAMENTE PELA SINALIZAÇÃO (PLACA - PROIBIDO ESTACIONAR).',
                    district: 'VITORIA',
                    place: 'R. DR. MOACYR GONCALVES',
                    plate: 'MQH9400',
                    points: '7',
                    warning: 'false'
                };
                this.tickets.push( ticket );
                let ticket2 = {
                    classification: 'LEVE',
                    date: '2013-09-06T20:12:00-03:00',
                    description: 'ESTACIONAR O VEÍCULO EM LOCAIS E HORÁRIOS PROIBIDOS ESPECIFICAMENTE PELA SINALIZAÇÃO (PLACA - PROIBIDO ESTACIONAR).',
                    district: 'VITORIA',
                    place: 'R. DR. MOACYR GONCALVES',
                    plate: 'MQH9400',
                    points: '2',
                    warning: 'false'
                };
                this.tickets.push( ticket2 );
                return;
            } )
            .catch( () => {
                this.tickets = [];
                return;
            } );
    }
}

SepConsultaController.$inject = [ '$scope', 'detranApiService' ];

export default SepConsultaController;
