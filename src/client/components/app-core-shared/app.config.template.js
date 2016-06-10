import angular from 'angular';

export default
    angular.module( 'app-configuration', [] )
            .constant( 'appConfig', {

                apiESPM: '<url_api>',

                identityServer: {
                    url: '<url_identity_server>',
                    AuthenticatedUrls: [
                        'connect/userinfo'
                    ],
                    clients: {
                        espm: {
                            id: 'espm',
                            secret: '<secret>'
                        },

                        espmGoogleLoginAndroid: {
                            id: 'espmgoogleloginAndroid',
                            secret: '<secret>'
                        },

                        espmFacebookLoginAndroid: {
                            id: 'espmfacebookloginAndroid',
                            secret: '<secret>'
                        },

                        espmClientAndroid: {
                            id: 'ESPMClientAndroid',
                            secret: '<secret>'
                        }
                    }
                },

                googleWebClientId: '<client_id>',

                mobile: {
                    client_id: 'espm-mobile',
                    client_secret: 'secret',
                    grant_type: 'password',
                    scope: 'openid',
                    digitosCodigoVerificacao: 6
                }
            } );
