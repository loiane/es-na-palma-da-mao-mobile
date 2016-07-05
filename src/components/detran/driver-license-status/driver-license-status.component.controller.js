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
        this.licenseData = undefined;
        this.tickets = [];
    }

    get hasData() {
        return angular.isDefined( this.licenseData ) && this.licenseData !== '';
    }

    get licenseBlocked() {
        return this.licenseData && this.licenseData.status == 1;
    }

    get licenseExpired() {
        return this.licenseData && moment( this.licenseData.expirationDate ).isBefore( moment() );
    }

    /**
     * @param {Number} number: Process number
     * @return {undefined}
     */
    getLicenseData( id ) {
        this.detranApiService.getDriverLicenseData( id )
            .then( licenseData => {
                this.licenseData = licenseData;
                return;
            } )
            .catch( () => {
                this.licenseData = undefined;
                return;
            } );
    }

    getTickets( id ) {
        this.detranApiService.getTickets( id )
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
