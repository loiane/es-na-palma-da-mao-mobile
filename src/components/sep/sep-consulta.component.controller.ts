import SepApiService from './shared/sep-api.service';

class SepConsultaController {

    private seeMoreUpdates:string = 'VER MAIS';
    private processNumber:string = '';
    private process = undefined;
    private populated:boolean = false;
    private showAllUpdates:boolean = false;

    /**
     * @constructor
     *
     * @param {Object} $scope: $scope
     * @param {Object} $state: $state
     * @param {Object} $mdDialog: $mdDialog
     * @param {SepApiService} sepApiService: Api do SEP
     * @return {undefined}
     */
    constructor( private $window,
                 private $scope,
                 private $state,
                 private $mdDialog,
                 private $ionicScrollDelegate,
                 private sepApiService:SepApiService ) {
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }

    /**
     *
     */
    activate() {
    }

    /**
     *
     * @returns {any}
     */
    get firstUpdate() {
        if ( this.process && this.process.updates && this.process.updates.length > 0 ) {
            return this.process.updates[this.process.updates.length - 1];
        }
    }

    get lastUpdate() {
        if ( this.process && this.process.updates && this.process.updates.length > 0 ) {
            return this.process.updates[0];
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

SepConsultaController.$inject = [
    '$window',
    '$scope',
    '$state',
    '$mdDialog',
    '$ionicScrollDelegate',
    'sepApiService'
];

export default SepConsultaController;
