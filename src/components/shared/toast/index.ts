import './toast.css!';
import ToastController from './toast.controller';
import ToastService from './toast.service';

export default angular.module( 'shared.toast', [] )
                      .service( 'toast', ToastService )
                      .controller( 'toastController', ToastController );
