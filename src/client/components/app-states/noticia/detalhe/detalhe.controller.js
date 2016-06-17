import moment from 'moment';

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
        this._moment = moment;

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
        this._detalhe = {};
        //this.toast.show( { title: 'DashBoard Controller ativado' } );

        this.getDetalhe( this.$stateParams.id );
    }

    get detalhe() { return this._detalhe; }
    get moment() { return this._moment; }

    getDetalhe( id, success, error ) {
        this.$http.get( `${this.appConfig.apiNoticia}noticia/${id}` )
        .then( ( response ) => {
            this._detalhe = response.data;

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

export default [ '$rootScope', '$http', '$state', '$stateParams', '$ionicHistory', 'appConfig', 'toast', DetalheController ];


