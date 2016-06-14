class NoticiaController {

    /**
     * @constructor
     *
     * @param {Object} toast - toast service
     *
     */
    constructor( toast ) {
        this.toast = toast;
        this.activate();
    }

    /**
     * Ativa o controller
     *
     * @returns {void}
     */
    activate() {
        //this.toast.show( { title: 'DashBoard Controller ativado' } );
    }
}

export default [ 'toast', NoticiaController ];


