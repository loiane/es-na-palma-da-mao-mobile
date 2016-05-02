class AppController {
    constructor( toast ) {
        this.toast = toast;

        this.activate();
    }

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
