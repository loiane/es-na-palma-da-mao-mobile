class AgendaController {

    /**
     * @constructor
     *
     * @param {Object} toast - toast service
     *
     */
    constructor( toast, $state ) {
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

export default [ 'toast', '$state', AgendaController ];


