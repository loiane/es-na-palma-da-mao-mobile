
function httpInterceptor( $httpProvider ) {
    $httpProvider.interceptors
        .push( [ '$q', '$location', '$localStorage', 'appConfig', function( $q, $location, $localStorage, appConfig ) {

            function addAuthorizationHeader( config, token ) {
                config.headers = config.headers || {};
                config.headers.Authorization = 'Bearer ' + token;

                return config;
            }

            return {
                'request': function( config ) {

                    if ( $localStorage.token ) {

                        if ( config.url.indexOf( appConfig.apiESPM ) >= 0 ) {

                            addAuthorizationHeader( config, $localStorage.token.access_token );

                        } else if ( config.url.indexOf( appConfig.identityServer.url ) >= 0 ) {

                            var hasUrl = appConfig.identityServer.AuthenticatedUrls.filter( function( item ) {
                                return config.url == appConfig.identityServer.url + item;
                            } );

                            if ( hasUrl.length > 0 ) {
                                addAuthorizationHeader( config, $localStorage.token.access_token );
                            }
                        }
                    }
                    return config;
                }/*,
                'responseError': function( response ) {
                    if ( response.status === 401 || response.status === 403 ) {
                        delete $localStorage.token;
                        //$location.path( '/signin' );
                    }
                    return $q.reject( response );
                }*/
            };
        } ] );
}

export default [ '$httpProvider', 'appConfig', httpInterceptor ];
