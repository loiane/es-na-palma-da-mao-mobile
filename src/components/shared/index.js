import toast from './toast/index.js';
import dialog from './dialog/index.js';
import cpfService from './cpf.service.js';
import fromNowFilter from './from-now.filter.js';
import toNowFilter from './to-now.filter.js';
import calendarFilter from './date-calendar.filter.js';
import capitalizeFilter from './capitalize.filter.js';
import menu from './menu/index.js';
import settings from './settings.js';
import ionicConfig from './ionic.config.js';
import themeConfig from './theme.config.js';
import httpInterceptorsConfig from './http-interceptors.config.js';
import appRun from './run.js';
import loader from './loader/index.js';
import routes from './routes/index.js';
import authentication from './authentication/index.js';

import directives from './directives/index.js';

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
                      .filter( 'toNow', toNowFilter )
                      .filter( 'calendar', calendarFilter )
                      .filter( 'capitalize', capitalizeFilter )
                      .run( appRun );
