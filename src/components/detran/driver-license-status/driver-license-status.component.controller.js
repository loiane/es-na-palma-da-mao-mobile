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
        return angular.isDefined( this.driverData ) && this.driverData.status == 0;
    }

    get licenseBlocked() {
        return angular.isDefined( this.driverData ) && this.driverData.status == 1;
    }

    get licenseExpired() {
        return angular.isDefined( this.driverData ) && moment( this.driverData.expirationDate ).add( 1, 'months' ).isBefore( moment().startOf( 'day' ) );
    }

    get licenseRenew() {
        return angular.isDefined( this.driverData )
            && moment( this.driverData.expirationDate ).add( 1, 'months' ).isAfter( moment().startOf( 'day' ) )
            && moment().startOf( 'day' ).isAfter( moment( this.driverData.expirationDate ) );
    }

    get expirationDate() {
        if ( angular.isDefined( this.driverData ) ) {
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
                if ( moment( ticket.date ).isAfter( moment().startOf( 'day' ).subtract( 1, 'year' ) ) ) {
                    points += +ticket.points;
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

    /**
     * @param {any} $index
     */
    showDetails( $index ) {
        if ( this.selectedIndex !== $index ) {
            this.selectedIndex = $index;
        } else {
            this.selectedIndex = -1;
        }
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
                return;
            } );
    }
}

SepConsultaController.$inject = [ '$scope', 'detranApiService' ];

export default SepConsultaController;
