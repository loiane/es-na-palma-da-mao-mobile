class DetalheController {

    /**
     * @constructor
     *
     * @param {Object} toast - toast service
     *
     */
    constructor( $rootScope, $http, $state, $stateParams, $ionicHistory, appConfig, toast ) {
        this.$rootScope = $rootScope;
        this.$http = $http;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.$ionicHistory = $ionicHistory;
        this.toast = toast;
        this.appConfig = appConfig;

        this.activate();

        //$rootScope.$ionicGoBack
    }

    /**
     * Ativa o controller
     *
     * @returns {void}
     */
    activate() {
        this._news = {};
        //this.toast.show( { title: 'DashBoard Controller ativado' } );

        this.getNews( this.$stateParams.id );
    }

    get news() {
        return this._news;
    }

    getNews( id, success, error ) {
        this.$http.get( `${this.appConfig.apiNoticia}${id}` )
            .then( ( response ) => {
                this._news = response.data;

                //success();
            }, error );
    }

    proxima( id ) {
        this.$state.go( 'app.noticiaDetalhe/:id', { id: id } );
    }

    anterior( id ) {
        this.$state.go( 'app.noticiaDetalhe/:id', { id: id } );
    }
}

export default [
    '$rootScope',
    '$http',
    '$state',
    '$stateParams',
    '$ionicHistory',
    'appConfig',
    'toast',
    DetalheController
];


