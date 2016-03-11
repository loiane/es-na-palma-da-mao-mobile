export default class AppController {
    constructor (logger) {
        'ngInject';
        this.activate();
        logger.info('Aplicação inicializada');
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