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
    constructor( displayOption, dialog ) {
        this.displayOption = displayOption;
        this.dialog = dialog;

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

export default [
    'displayOption', 'dialog', DialogController
];
