import { ISettings } from '../settings/index';
import { IQService } from 'angular';

let httpInterceptorsConfig = $httpProvider => {

    let authorizationInterceptor = ( $q: IQService, $localStorage, settings: ISettings ) => {

        // Add Bearer token Authorization header to the config (request object)
        let addAuthorizationHeader = ( config, token ) => {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        };

        let hasUrl = ( endPoint, urls ) => urls.filter( url => endPoint.startsWith( url ) ).length > 0;

        return {
            'request': ( config ) => {
                // If has no token just execute the request as is
                if ( !$localStorage.token ) {
                    return config;
                }

                // Check Prodest IdentityServer
                if ( config.url.startsWith( settings.identityServer.url ) && hasUrl( config.url, settings.identityServer.AuthenticatedUrls ) ) {
                    addAuthorizationHeader( config, $localStorage.token.access_token );
                } else if ( hasUrl( config.url, settings.api.secure ) ) { // Check all secure APIs
                    addAuthorizationHeader( config, $localStorage.token.access_token );
                }

                return config;
            }
        };
    };

    $httpProvider.interceptors.push( [ '$q', '$localStorage', 'settings', authorizationInterceptor ] );
};

httpInterceptorsConfig.$inject = [ '$httpProvider', 'settings' ];

export default httpInterceptorsConfig;
