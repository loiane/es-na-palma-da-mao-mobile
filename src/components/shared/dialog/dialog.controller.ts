/**
 * Controller para janela  modal
 */
class DialogController {

    /**
     * Dialog controller
     *
     * @constructor
     *
     * @param {Object} displayOption - xxx
     * @param {Object} dialog - xxx
     *
     * @returns {void}
     */
    constructor( private displayOption, private dialog ) {
        this.activate();
    }

    /**
     * Ativa o controller
     *
     * @returns {void}
     */
    activate() {
    }

    /**
     *
     *
     * @returns {void}
     */
    cancel() {
        this.dialog.cancel();
    }

    /**
     *
     *
     * @returns {void}
     */
    ok() {
        this.dialog.ok();
    }

}

DialogController.$inject = [
    'displayOption', 'dialog'
];

export default DialogController;
