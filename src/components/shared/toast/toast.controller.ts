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
    constructor( private displayOption ) {
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

ToastController.$inject = ['displayOption'];

export default ToastController;
