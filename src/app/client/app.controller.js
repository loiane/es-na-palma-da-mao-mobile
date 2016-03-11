export default class AppController {
    constructor () {
        'ngInject';
        this.activate();
    }

    activate() {
        this.showFooter = true; 
        this.showHeader = true;
        this.showSideBar = true;
        this.showFooterControls = true;
        this.showUserInfo = true;
        this.userName = 'Daniel Hoisel';
        this.appName = 'Portal do Cidadão';
    } 
}