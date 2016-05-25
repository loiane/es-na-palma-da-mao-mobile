import angular from 'angular';

export default
    angular.module( 'app-configuration', [] )
            .constant( 'appConfig', {

                apiESPM: 'http://localhost:6660/',

                mobile: {
                    client_id: 'espm-mobile',
                    client_secret: 'secret',
                    grant_type: 'password',
                    scope: 'openid',
                    digitosCodigoVerificacao: 6
                }
            } );
