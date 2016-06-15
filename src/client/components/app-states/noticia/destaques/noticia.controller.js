import moment from 'moment';

class NoticiaController {

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
        this._destaques = [];
        this._detalhe = {};
        //this.toast.show( { title: 'DashBoard Controller ativado' } );

        this.getDestaques();
        this.getNoticias();
    }

    get primeiroDestaque() { return this._destaques.length > 0 ? this._destaques[ 0 ] : {}; }
    get outrosDestaques() { return this._destaques.length > 0 ? this._destaques.slice( 1 ) : []; }
    get destaques() { return this._destaques; }
    get noticias() { return this._noticias; }
    get detalhe() { return this._detalhe; }
    get moment() { return this._moment; }

    getDestaques( n, success, error ) {
        this.$http.get( `${this.appConfig.apiNoticia}destaques` )
        .then( ( response ) => {
            this._destaques = response.data;

            //success();
        }, ( erro ) => {
            console.log( erro );
        } );
    }

    getNoticias( filtro, success, error ) {
        this.$http.get( `${this.appConfig.apiNoticia}destaques` )
        .then( ( response ) => {
            this._noticias = response.data;

            //success();
        }, error );
    }

    getDetalhe( id, success, error ) {
        this.$http.get( `${this.appConfig.apiNoticia}noticia` )
        .then( ( response ) => {
            this._detalhe = response.data;

            success();
        }, error );
    }

    goToNoticia( id ) {
        this.$state.go( 'app.noticiaDetalhe/:id', { id: id } );
    }
}

export default [ '$http', '$state', 'appConfig', 'toast', NoticiaController ];


