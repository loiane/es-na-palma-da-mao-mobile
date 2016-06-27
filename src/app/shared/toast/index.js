import './toast.css!';
import ToastController from './toast.controller.js';
import ToastService from './toast.service.js';

export default angular.module( 'shared.toast', [] )
                      .service( 'toast', ToastService )
                      .controller( 'toastController', ToastController );
