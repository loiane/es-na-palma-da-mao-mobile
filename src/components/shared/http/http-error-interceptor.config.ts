import { HttpErrorSnifferService } from './http-error-sniffer.service';
import { Error } from './models/index';

let httpErrorInterceptorConfig = $httpProvider => {
    let httpErrorInterceptor = ( $q, $log, httpErrorSnifferService: HttpErrorSnifferService ) => {
        return {
            'response': function ( response ) {
                httpErrorSnifferService.error = undefined;
                return ( response );
            },
            'responseError': function ( response ) {
                const error = response.data as Error;

                error.message = error[ 'err' ];
                delete error[ 'err' ];

                error.status = response.status;
                error.handled = error.status === 404;
                error.guid = '1637d6ce-1c22-42fe-9d06-ee9755257c20';

                httpErrorSnifferService.error = error;

                $log.error( response );
                return $q.reject( response );
            }
        };
    };
    $httpProvider.interceptors.push( [ '$q', '$log', 'httpErrorSnifferService', httpErrorInterceptor ] );
};

httpErrorInterceptorConfig.$inject = [ '$httpProvider' ];

export default httpErrorInterceptorConfig;