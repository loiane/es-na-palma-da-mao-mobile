let httpInterceptorsConfig = $httpProvider => {

    let authorizationInterceptor = ( $q, $location, $localStorage, settings ) => {

        let addAuthorizationHeader = ( config, token ) => {
            config.headers = config.headers || {};
            config.headers.Authorization = 'Bearer ' + token;
        };
        return {
            'request': ( config ) => {
                if ( !$localStorage.token ) {
                    return config;
                }

                if ( config.url.indexOf( settings.apiESPM ) >= 0 ) {
                    addAuthorizationHeader( config, $localStorage.token.access_token );
                } else if ( config.url.indexOf( settings.identityServer.url ) >= 0 ) {

                    let hasUrl = settings.identityServer.AuthenticatedUrls.filter( item => {
                        return config.url == settings.identityServer.url + item;
                    } );

                    if ( hasUrl.length > 0 ) {
                        addAuthorizationHeader( config, $localStorage.token.access_token );
                    }
                }

                return config;
            }
        };
    };

    $httpProvider.interceptors
                 .push( [
                     '$q', '$location', '$localStorage', 'settings', authorizationInterceptor
                 ] );
};

export default ['$httpProvider', 'settings', httpInterceptorsConfig];
