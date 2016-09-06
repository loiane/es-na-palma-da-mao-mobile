import { HttpErrorSnifferService } from './http-error-sniffer.service';
import { AnswersService } from '../fabric/index';
import { Error } from './models/index';


let httpErrorInterceptorConfig = $httpProvider => {
    let httpErrorInterceptor = ( $q, $log, httpErrorSnifferService: HttpErrorSnifferService, answersService: AnswersService ) => {
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

                // Fabric
                answersService.sendResponseErrorEvent( response );

                $log.error( response );
                return $q.reject( response );
            }
        };
    };
    $httpProvider.interceptors.push( [ '$q', '$log', 'httpErrorSnifferService', 'answersService', httpErrorInterceptor ] );
};

httpErrorInterceptorConfig.$inject = [ '$httpProvider' ];

export default httpErrorInterceptorConfig;