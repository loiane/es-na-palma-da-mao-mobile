import moment from 'moment';

class ListaController {

    /**
     * @constructor
     *
     * @param {Object} toast - toast service
     *
     */
    constructor( $http, $state, appConfig, toast ) {
        this.$http = $http;
        this.$state = $state;
        this.toast = toast;
        this._moment = moment;

        this.appConfig = appConfig;

        this.activate();
    }

    /**
     * Ativa o controller
     *
     * @returns {void}
     */
    activate() {
        this._noticias = [];
        this.getNoticias();
    }

    get noticias() { return this._noticias; }
    get moment() { return this._moment; }

    getNoticias( filtro, success, error ) {
        this.$http.get( `${this.appConfig.apiNoticia}lista` )
        .then( ( response ) => {
            this._noticias = response.data;

            //success();
        }, error );
    }

    goToNoticia( id ) {
        this.$state.go( 'app.noticiaDetalhe/:id', { id: id } );
    }
}

export default [ '$http', '$state', 'appConfig', 'toast', ListaController ];


