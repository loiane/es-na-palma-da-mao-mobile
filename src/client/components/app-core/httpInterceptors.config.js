let httpInterceptorsConfig = $httpProvider => {

    let authorizationInterceptor = ( $q, $location, $localStorage, appConfig ) => {

        let addAuthorizationHeader = ( config, token ) => {
            config.headers = config.headers || {};
            config.headers.Authorization = 'Bearer ' + token;
        };
        return {
            'request': ( config ) => {
                if ( !$localStorage.token ) {
                    return config;
                }

                if ( config.url.indexOf( appConfig.apiESPM ) >= 0 ) {
                    addAuthorizationHeader( config, $localStorage.token.access_token );
                } else if ( config.url.indexOf( appConfig.identityServer.url ) >= 0 ) {

                    let hasUrl = appConfig.identityServer.AuthenticatedUrls.filter( item => {
                        return config.url == appConfig.identityServer.url + item;
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
                     '$q', '$location', '$localStorage', 'appConfig', authorizationInterceptor
                 ] );
};

export default [ '$httpProvider', 'appConfig', httpInterceptorsConfig ];
