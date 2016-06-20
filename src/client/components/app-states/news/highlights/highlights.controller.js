class HighlightsController {

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
        this.appConfig = appConfig;

        this.activate();
    }

    /**
     * Ativa o controller
     *
     * @returns {void}
     */
    activate() {
        this._highlights = [];
        this.getNews();
    }

    get firstNews() {
        return this._highlights.length > 0 ? this._highlights[ 0 ] : {};
    }

    get otherNews() {
        return this._highlights.length > 0 ? this._highlights.slice( 1 ) : [];
    }

    getNews( n, success, error ) {
        this.$http.get( `${this.appConfig.apiNoticia}highlights` )
            .then( ( response ) => {
                this._highlights = response.data;

                //success();
            }, ( erro ) => {
                console.log( erro );
            } );
    }

    goToNews( id ) {
        this.$state.go( 'app.news/:id', { id: id } );
    }
}

export default [ '$http', '$state', 'appConfig', 'toast', HighlightsController ];


