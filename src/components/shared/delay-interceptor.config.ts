let delayInterceptorConfig = $httpProvider => {
    let delayInterceptor = ( $timeout ) => {
        return {
            'response': (response) => {
                return $timeout( () => {
                    return response;
                }, 2500 );
            }
        };
    };
    $httpProvider.interceptors.push( [ '$timeout', delayInterceptor ] );
};

delayInterceptorConfig.$inject = [ '$httpProvider' ];

export default delayInterceptorConfig;