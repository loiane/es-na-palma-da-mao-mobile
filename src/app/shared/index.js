import toast from './toast/index.js';
import dialog from './dialog/index.js';
import authentication from './authentication/index.js';
import cpfService from './cpf.service.js';
import fromNowFilter from './from-now.filter.js';
import menu from './menu/index.js';
import settings from './settings.js';
import ionicConfig from './ionic.config.js';
import themeConfig from './theme.config.js';
import httpInterceptorsConfig from './http-interceptors.config.js';
import appRun from './run.js';

let dependencies = [
    menu.name, authentication.name, toast.name, dialog.name
];

export default angular.module( 'shared', dependencies )
                      .config( ionicConfig )
                      .config( themeConfig )
                      .config( httpInterceptorsConfig )
                      .constant( 'settings', settings )
                      .service( 'cpfService', cpfService )
                      .filter( 'fromNow', fromNowFilter )
                      .run( appRun );
