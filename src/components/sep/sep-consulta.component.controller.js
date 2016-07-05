class SepConsultaController {

    /**
     * @constructor
     *
     * @param {Object} $scope: $scope
     * @param {Object} $ionicScrollDelegate: $ionicScrollDelegate
     * @param {Object} sepApiService: Api do SEP
     * @return {undefined}
     */
    constructor( $scope, $ionicScrollDelegate, sepApiService ) {
        this.$scope = $scope;
        this.sepApiService = sepApiService;
        this.$ionicScrollDelegate = $ionicScrollDelegate;

        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }

    /**
     *
     */
    activate() {
        this.seeMoreUpdates = 'VER MAIS';
        this.processNumber = '';
        this.process = undefined;
        this.populated = false;
        this.showAllUpdates = false;
    }

    get firstUpdate() {
        if ( this.process && this.process.updates && this.process.updates.length > 0 ) {
            return this.process.updates[ this.process.updates.length - 1 ];
        }
    }

    get lastUpdate() {
        if ( this.process && this.process.updates && this.process.updates.length > 0 ) {
            return this.process.updates[ 0 ];
        }
    }

    get hiddenUpdates() {
        if ( this.process && this.process.updates && this.process.updates.length > 0 ) {
            return this.process.updates.slice( 1 );
        }
    }

    get hasProcess() {
        return angular.isDefined( this.process ) && this.process !== '';
    }

    toggleUpdates() {
        this.showAllUpdates = !this.showAllUpdates;

        if ( this.showAllUpdates ) {
            this.seeMoreUpdates = 'OCULTAR';
            this.$ionicScrollDelegate.scrollTo( 0, 300, true ); //TODO: try to search the element to scroll: anchorScroll
        } else {
            this.seeMoreUpdates = 'VER MAIS';
        }
    }

    /**
     * Test case: 68985037
     * @param {Number} number: Process number
     * @return {undefined}
     */
    getProcess( number ) {
        this.sepApiService.getProcessByNumber( number )
            .then( process => {
                this.process = process;
                return;
            } )
            .catch( () => {
                this.process = undefined;
                return;
            } )
            .finally( () => {
                this.populated = true;
            } );
    }
}

SepConsultaController.$inject = [ '$scope', '$ionicScrollDelegate', 'sepApiService' ];

export default SepConsultaController;
