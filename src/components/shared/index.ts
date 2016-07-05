import toast from './toast/index';
import dialog from './dialog/index';
import cpfService from './cpf.service';
import fromNowFilter from './from-now.filter';
import calendarFilter from './date-calendar.filter';
import capitalizeFilter from './capitalize.filter';
import menu from './menu/index';
import settings from './settings';
import ionicConfig from './ionic.config';
import themeConfig from './theme.config';
import httpInterceptorsConfig from './http-interceptors.config';
import appRun from './run';
import loader from './loader/index';
import routes from './routes/index';
import authentication from './authentication/index';

import directives from './directives/index';

let dependencies = [
    menu.name, toast.name, dialog.name, loader.name, routes.name, authentication.name, directives.name
];

export default angular.module( 'shared', dependencies )
                      .config( ionicConfig )
                      .config( themeConfig )
                      .config( httpInterceptorsConfig )
                      .constant( 'settings', settings )
                      .service( 'cpfService', cpfService )
                      .filter( 'fromNow', fromNowFilter )
                      .filter( 'calendar', calendarFilter )
                      .filter( 'capitalize', capitalizeFilter )
                      .run( appRun );
