/**
 * Controller para janela  modal
 */
class DialogController {

    static $inject: string[] = [
        'displayOption', 'dialog'
    ];

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
    public activate() {
    }

    /**
     *
     *
     * @returns {void}
     */
    public cancel() {
        this.dialog.cancel();
    }

    /**
     *
     *
     * @returns {void}
     */
    public ok() {
        this.dialog.ok();
    }

}

export default DialogController;
