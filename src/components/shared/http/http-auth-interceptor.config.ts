import { ISettings } from '../settings/index';
import { IQService } from 'angular';

let httpInterceptorsConfig = $httpProvider => {

    let authorizationInterceptor = ( $q: IQService, $localStorage, settings: ISettings ) => {

        // Add Bearer token Authorization header to the config (request object)
        let addAuthorizationHeader = ( config, token ) => {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        };

        return {
            'request': ( config ) => {
                // If has no token just execute the request as is
                if ( !$localStorage.token ) {
                    return config;
                }

                addAuthorizationHeader( config, $localStorage.token.access_token );

                return config;
            },
            'responseError': ( rejection ) => {
                // rejection.status 498 = invalid token
                // console.error( 'responseError', rejection );
                return $q.reject( rejection );
            }
        };
    };

    $httpProvider.interceptors.push( [ '$q', '$localStorage', 'settings', authorizationInterceptor ] );
};

httpInterceptorsConfig.$inject = [ '$httpProvider', 'settings' ];

export default httpInterceptorsConfig;
