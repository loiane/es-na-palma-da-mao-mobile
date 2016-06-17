import moment from 'moment';

class DestaqueController {

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
        this._destaques = [];
        this.getDestaques();
    }

    get primeiroDestaque() {
        return this._destaques.length > 0 ? this._destaques[ 0 ] : {};
    }

    get outrosDestaques() {
        return this._destaques.length > 0 ? this._destaques.slice( 1 ) : [];
    }

    get moment() {
        return this._moment;
    }

    getDestaques( n, success, error ) {
        this.$http.get( `${this.appConfig.apiNoticia}highlights` )
            .then( ( response ) => {
                this._destaques = response.data;

                //success();
            }, ( erro ) => {
                console.log( erro );
            } );
    }

    goToNoticia( id ) {
        this.$state.go( 'app.noticiaDetalhe/:id', { id: id } );
    }
}

export default [ '$http', '$state', 'appConfig', 'toast', DestaqueController ];


