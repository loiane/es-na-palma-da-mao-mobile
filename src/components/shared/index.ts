import toast from './toast/index';
import dialog from './dialog/index';
import cpfService from './cpf.service';
import fromNowFilter from './from-now.filter';
import toNowFilter from './to-now.filter';
import calendarFilter from './calendar.filter';
import capitalizeFilter from './capitalize.filter';
import { Settings } from './settings/index';
import ionicConfig from './ionic.config';
import themeConfig from './theme.config';
import httpAuthInterceptorConfig from './http/http-auth-interceptor.config';
// import httpDelayInterceptorConfig from './http/http-delay-interceptor.config';
import httpErrorInterceptorConfig from './http/http-error-interceptor.config';
import httpSnifferInterceptorConfig from './http/http-sniffer-interceptor.config';
import httpNetworkInterceptorConfig from './http/http-network-interceptor.config';
import { HttpSnifferService, HttpErrorSnifferService } from './http/index';
import appRun from './run';
import loader from './loader/index';
import routes from './routes/index';
import authentication from './authentication/index';
import directives from './directives/index';
import { ionicLoadingConfig } from './ionic-loading.config';
import pushModule from './push/index';
import fabricModule from './fabric/index';
import permissionsModule from './permissions/index';
import network from './network/index';
import offline from './offline/index';

let dependencies = [
    toast.name,
    dialog.name,
    loader.name,
    routes.name,
    authentication.name,
    directives.name,
    pushModule.name,
    fabricModule.name,
    permissionsModule.name,
    network.name,
    offline.name
];

export * from './toast/index';
export * from './dialog/index';
export * from './offline/index';

export default angular.module( 'shared', dependencies )
                      .constant( 'settings', Settings.getInstance() )
                      .service( 'httpSnifferService', HttpSnifferService )
                      .service( 'httpErrorSnifferService', HttpErrorSnifferService )
                      .config( ionicConfig )
                      .config( themeConfig )
                      .config( httpSnifferInterceptorConfig )
                      .config( httpErrorInterceptorConfig )
                      .config( httpNetworkInterceptorConfig )
                      // .config( httpDelayInterceptorConfig )
                      .config( httpAuthInterceptorConfig )
                      .constant( '$ionicLoadingConfig', ionicLoadingConfig )
                      .service( 'cpfService', cpfService )
                      .filter( 'fromNow', fromNowFilter )
                      .filter( 'toNow', toNowFilter )
                      .filter( 'calendar', calendarFilter )
                      .filter( 'capitalize', capitalizeFilter )
                      .run( appRun );
