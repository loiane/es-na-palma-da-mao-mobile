/**
 * Controller
 */
class ToastController {

    static $inject: string[] = [ 'displayOption' ];
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
    public activate() {
    }
}

export default ToastController;
