import DialogController from './dialog.controller.js';
import DialogService from './dialog.service.js';

export default angular.module( 'app-core-tools-dialog', [] )
                      .controller( 'dialogController', DialogController )
                      .service( 'dialog', DialogService );
