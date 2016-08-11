let httpErrorInterceptorConfig = $httpProvider => {
    let httpErrorInterceptor = ( $q, $log ) => {
        return {
            'responseError': function ( error ) {
                $log.error( error );
                return $q.reject( error );
            }
        };
    };
    $httpProvider.interceptors.push( [ '$q', '$log', httpErrorInterceptor ] );
};

httpErrorInterceptorConfig.$inject = [ '$httpProvider' ];

export default httpErrorInterceptorConfig;