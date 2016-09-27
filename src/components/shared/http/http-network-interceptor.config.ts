import { Network } from 'ionic-native';
import { IRootScopeService } from 'angular';

let httpNetworkInterceptorConfig = $httpProvider => {
    let httpNetworkInterceptor = ( $rootScope: IRootScopeService ) => {
        return {
            'request': ( config ) => {
                // ref: http://www.thoughtdelimited.org/thoughts/post.cfm/angular-material-design-mdtoast-and-httpinterceptors
                if ( Network.connection === 'none' ) {
                    $rootScope.$broadcast( 'noConnection', { message: 'Sem conexão com a internet' });
                } else {
                    return ( config );
                };
            }
        };
    };
    $httpProvider.interceptors.push( [ '$rootScope', httpNetworkInterceptor ] );
};

httpNetworkInterceptorConfig.$inject = [ '$httpProvider' ];

export default httpNetworkInterceptorConfig;