
import { AppSettings } from './appSettings';

export class Settings implements AppSettings {

   public readonly api = {
       news: 'https://api.es.gov.br/news',
       calendars: 'https://api.es.gov.br/calendars',
       sep: 'https://api.es.gov.br/sep',
       detran: 'https://api.es.gov.br/detran',

       secure: [
           'https://api.es.gov.br/detran'
       ]
   };

   public readonly identityServer = {
       url: 'https://acessocidadao.es.gov.br/is/',
       // url: 'https://sistemas.dchm.es.gov.br/prodest/acessocidadao/is/',
       AuthenticatedUrls: [
           'https://acessocidadao.es.gov.br/is/connect/userinfo',
           'https://acessocidadao.es.gov.br/is/connect/introspect'
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
   };

   public readonly googleWebClientId = '1014254010175-4ca3s29l6t9ibp5r0nnrp4hg63tn4sav.apps.googleusercontent.com';

   public readonly mobile = {
       client_id: 'espm-mobile',
       client_secret: 'secret',
       grant_type: 'password',
       scope: 'openid',
       digitosCodigoVerificacao: 6
   };

   
   /**
    * 
    * 
    * @private
    * @static
    * @type {Settings}
    */
   private static instance: Settings;


   /**
    * Creates an instance of Singleton.
    * 
    */
   private constructor() { }

   
   /**
    * 
    * 
    * @static
    * @returns
    */
   static getInstance() {
       if ( !Settings.instance ) {
           Settings.instance = new Settings();
       }
       return Settings.instance;
   }
}