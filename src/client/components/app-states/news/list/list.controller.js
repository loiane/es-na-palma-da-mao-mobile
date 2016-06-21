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
    constructor($scope, $state, $mdDialog, $ionicLoading, newsApiService, $ionicScrollDelegate) {
        this.$state = $state;
        this.$scope = $scope;
        this.newsApiService = newsApiService;
        this.$mdDialog = $mdDialog;
        this.$ionicLoading = $ionicLoading;
        this.news = [];
        this.currentPage = 0;
        this.availableOrigins = [];
        this.selectedOrigins = [];
        this.activated = false;
        this.hasMoreNews = true;
        this.populated = false;

        this.$ionicScrollDelegate = $ionicScrollDelegate;

        this.activate();
    }

    reset(){
        this.populated = false;
        this.hasMoreNews = true;
        this.currentPage = 0;
        this.news = [];
    }

    /**
     *
     */
    activate() {
        this.getAvailableOrigins()
            .finally(() => {
                this.activated = true;
            });
    }

    /**
     * Carrega lista de origins disponíveis
     *
     * @returns {*}
     */
    getAvailableOrigins() {
        return this.newsApiService.getAvailableOrigins()
            .then(origins => {
                this.availableOrigins = origins;
                this.selectedOrigins = angular.copy(this.availableOrigins);
                return origins;
            });
    }

    /**
     * 
     */
    getNews(origins, options) {
        if (options.pageNumber){
            this.currentPage = options.pageNumber;
        }

        this.newsApiService.getNews(origins, options)
            .then(nextNews => {
                this.news = this.news.concat(nextNews)
                
                if (!nextNews.length){
                    this.hasMoreNews = false;
                } 

                this.populated = true;
            })
            .finally(() => {
                this.$scope.$broadcast('scroll.infiniteScrollComplete');
            });
    }

    /**
     *
     * @param $event
     */
    openOriginsFilter($event) {
        this.$mdDialog.show({
            controller: SourcesDialogController,
            template: sourcesDialogTemplate,
            targetEvent: $event,
            bindToController: true,
            controllerAs: 'vm',
            locals: {
                availableOrigins: this.availableOrigins,
                selectedOrigins: this.selectedOrigins
            }
        })
            .then((origins) => {
                this.selectedOrigins = origins;
                this.reset();
                return this.getNews(origins, { pageNumber: 1 });
            });
    }

    goToNews(id) {
        this.$state.go('app.news/:id', { id: id });
    }
}

export default [
    '$scope', '$state', '$mdDialog', '$ionicLoading', 'newsApiService', '$ionicScrollDelegate', ListController
];
