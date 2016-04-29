/**
 * Controller
 */
class ToastController {

    /**
     * Toast Message controller
     *
     * @constructor
     *
     * @param {Object} displayOption - xxx

     * @returns {void}
     */
    constructor( displayOption ) {
        this.displayOption = displayOption;
        this.activate();
    }

    /**
     * Ativa o controller
     *
     * @returns {void}
     */
    activate() {
    }
}

export default [
    'displayOption', ToastController
];
