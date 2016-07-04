class SepConsultaController {

    /**
     * @constructor
     *
     * @param {Object} $scope: $scope
     * @param {Object} $state: $state
     * @param {Object} $mdDialog: $mdDialog
     * @param {Object} sepApiService: Api do SEP
     * @return {undefined}
     */
    constructor( $window, $scope, $state, $mdDialog, $ionicScrollDelegate, sepApiService ) {
        this.$window = $window;
        this.$state = $state;
        this.$scope = $scope;
        this.sepApiService = sepApiService;
        this.$mdDialog = $mdDialog;
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

        //TODO: remover
        this.getProcess( 68985037 );
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
     * @param {Number} number: Process number
     * @return {undefined}
     */
    getProcess( number ) {
        this.sepApiService.getProcessByNumber( number )
            .then( process => {
                this.process = process;
                return;
            }, () => {
                this.process = undefined;
                return;
            } )
            .finally( () => {
                this.populated = true;
            } );
    }
}

export default
    [
        '$window',
        '$scope',
        '$state',
        '$mdDialog',
        '$ionicScrollDelegate',
        'sepApiService',
        SepConsultaController
    ];
