import moment from 'moment';

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

        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }

    /**
     *
     */
    activate() {
        this.driverData = undefined;
        this.tickets = [];

        this.getDriverData();
        this.getTickets();
    }

    get hasData() {
        return angular.isDefined( this.driverData ) && this.driverData !== '';
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

    /**
     * @param {Number} number: Process number
     * @return {undefined}
     */
    getDriverData() {
        this.detranApiService.getDriverData()
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
     */
    getTickets() {
        this.detranApiService.getTickets()
            .then( tickets => {
                this.tickets = tickets;
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
