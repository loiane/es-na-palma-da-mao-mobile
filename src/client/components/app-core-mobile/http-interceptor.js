
function httpInterceptor( $httpProvider ) {
    $httpProvider.interceptors
        .push( [ '$q', '$location', '$localStorage', 'appConfig', function( $q, $location, $localStorage, appConfig ) {
            return {
                'request': function( config ) {

                    if ( config.url.indexOf( appConfig.apiESPM ) >= 0 ) {
                        config.headers = config.headers || {};
                        if ( $localStorage.token ) {
                            config.headers.Authorization = 'Bearer ' + $localStorage.token.access_token;
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
