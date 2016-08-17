import DialogController from './dialog.controller';
import { DialogService } from './dialog.service';

export default angular.module( 'shared.dialog', [] )
                      .controller( 'dialogController', DialogController )
                      .service( 'dialog', DialogService );

export * from './dialog.service';
