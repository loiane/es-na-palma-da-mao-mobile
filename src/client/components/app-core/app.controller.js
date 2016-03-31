 class AppController {
     constructor( logger ) {
         'ngInject';
         this.activate();
         logger.info( 'Aplicação inicializada' );
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

 export default [ 'logger', AppController ];
