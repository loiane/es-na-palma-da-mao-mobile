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
                const error: Error = angular.merge( {
                    status: response.status,
                    error: 'Erro inesperado',
                    message: 'Erro inesperado'
                }, response.data || {} );

                // normaliza nome da propriedade
                error.message = error[ 'error' ];
                delete error[ 'error' ];

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