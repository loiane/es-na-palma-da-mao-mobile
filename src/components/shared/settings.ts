const settings = {

    api: {
        espm: 'http://localhost:6660',
        news: 'https://api.es.gov.br/news',
        sep: 'https://api.es.gov.br/sep',
        calendars: 'https://api.es.gov.br/calendars'
    },

    identityServer: {
        url: 'https://acessocidadao.es.gov.br/is/',
        // url: 'https://sistemas.dchm.es.gov.br/prodest/acessocidadao/is/',
        AuthenticatedUrls: [
            'connect/userinfo', 'connect/introspect'
        ],
        clients: {
            espm: {
                id: 'espm',
                secret: '78aa4d23-de7f-463e-bd1a-3759f5e1eb7a'
            },

            espmExternalLoginAndroid: {
                id: 'espmexternalloginandroid',
                secret: '08d5bc0ead574cf494dc36ea5dcb7f26'
            }
        }
    },

    googleWebClientId: '1014254010175-4ca3s29l6t9ibp5r0nnrp4hg63tn4sav.apps.googleusercontent.com',

    mobile: {
        client_id: 'espm-mobile',
        client_secret: 'secret',
        grant_type: 'password',
        scope: 'openid',
        digitosCodigoVerificacao: 6
    }
};

export default settings;
