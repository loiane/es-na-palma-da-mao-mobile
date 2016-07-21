export interface AppSettings {
   api: {
       news: string,
       calendars: string,
       sep: string,
       detran: string,
       secure: string[]
   };

   identityServer: {
       url: string,
       AuthenticatedUrls: string[],
       clients: {
           espm: {
               id: string,
               secret: string
           };

           espmExternalLoginAndroid: {
               id: string,
               secret: string
           };
       }
   };

   googleWebClientId: string;

   mobile: {
       client_id: string,
       client_secret: string,
       grant_type: string,
       scope: string,
       digitosCodigoVerificacao: number,
   };
}
