/**
 *
 */
class AppController {

    /**
     * @constructor
     *
     * @param {Object} toast - toast service
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
        this.showFooter = true;
        this.showHeader = true;
        this.showSideBar = true;
        this.showFooterControls = true;
        this.showUserInfo = true;
        this.userName = 'Renzo';
        this.appName = 'PRODEST';
    }
}

export default [ 'toast', AppController ];
