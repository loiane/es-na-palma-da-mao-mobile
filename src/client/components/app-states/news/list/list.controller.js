import sourcesDialogTemplate from './sources-dialog/sources-dialog.tpl.html!text';
import SourcesDialogController from './sources-dialog/sources-dialog.controller';

class ListController {

    /**
     * @constructor
     *
     * @param $state
     * @param $mdDialog
     * @param $ionicLoading
     * @param newsApiService
     */
    constructor( $state, $mdDialog, $ionicLoading, newsApiService ) {
        this.$state = $state;
        this.newsApiService = newsApiService;
        this.$mdDialog = $mdDialog;
        this.$ionicLoading = $ionicLoading;
        this.news = [];
        this.availableOrigins = [];
        this.selectedOrigins = [];
        this.activated = false;
        this.activate();
    }

    /**
     *
     */
    activate() {
        this.$ionicLoading.show();
        this.getAvailableOrigins()
            .then( origins => this.getNews( origins ) )
            .finally( () => {
                this.$ionicLoading.hide();
                this.activated = true;
            } );
    }

    /**
     * Carrega lista de origins disponíveis
     *
     * @returns {*}
     */
    getAvailableOrigins() {
        return this.newsApiService.getAvailableOrigins()
                   .then( origins => {
                       this.availableOrigins = origins;
                       this.selectedOrigins = angular.copy( this.availableOrigins );
                       return origins;
                   } );
    }

    /**
     *
     */
    getNews( origins ) {
        this.$ionicLoading.show( 200 );
        return this.newsApiService.getNews( origins )
                   .then( ( news ) => this.news = news )
                   .finally( () => {
                       this.$ionicLoading.hide();
                   } );
    }

    /**
     *
     * @param $event
     */
    openOriginsFilter( $event ) {
        this.$mdDialog.show( {
            controller: SourcesDialogController,
            template: sourcesDialogTemplate,
            targetEvent: $event,
            bindToController: true,
            controllerAs: 'vm',
            locals: {
                availableOrigins: this.availableOrigins,
                selectedOrigins: this.selectedOrigins
            }
        } )
            .then( ( origins ) => {
                this.selectedOrigins = origins;
                return this.getNews( origins );
            } );
    }

    goToNews( id ) {
        this.$state.go( 'app.news/:id', { id: id } );
    }
}

export default [
    '$state', '$mdDialog', '$ionicLoading', 'newsApiService', ListController
];


