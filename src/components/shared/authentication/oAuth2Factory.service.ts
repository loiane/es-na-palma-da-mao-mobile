/** Classe para acesso ao IdentityServer3 */
class OAuth2 {

    static $inject: string[] = [ '$window', '$http', '$localStorage' ];

    private identityServerUrl: string;

    /** @constructor */
    constructor( private $window,
                 private $http,
                 private $localStorage ) {
        this.$localStorage.tokenClaims = this.user;
    }

    /**
     *
     * @param identityServerUrl
     */
    initialize( identityServerUrl ) {
        this.identityServerUrl = identityServerUrl;
    }

    /**
     * Decodifica uma url Base64
     */
    urlBase64Decode( str ) {
        let output = str.replace( '-', '+' ).replace( '_', '/' );
        switch ( output.length % 4 ) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                throw 'Illegal base64url string!';
        }
        return this.$window.atob( output );
    }

    /**
     * Busca o token salvo no localstorage e retorna os claims do usuário
     * @return {object} Claims do usuário
     */
    get user() {
        let token = this.token;

        let user = {};
        if ( angular.isDefined( token ) ) {
            let encoded = token.access_token.split( '.' )[ 1 ];
            user = angular.fromJson( this.urlBase64Decode( encoded ) );
        }
        return user;
    }

    get token() {
        if ( !this.$localStorage.token ) {
            return undefined;
        }

        return this.$localStorage.token;
    }

    /**
     * @return {object} Claims do usuário
     */
    get tokenClaims() {
        return this.$localStorage.tokenClaims;
    }

    get userInfo() {
        return this.$localStorage.userInfo;
    }

    /**
     * Faz a requisição de um token no IdentityServer3, a partir dos dados fornecidos.
     */
    getToken( data, success?, error? ) {
        let getTokenUrl = `${this.identityServerUrl}connect/token`;

        let options = {
            method: 'POST',
            url: getTokenUrl,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            transformRequest: function ( obj ) {
                let str = [];
                for ( let p in obj ) {
                    str.push( encodeURIComponent( p ) + '=' + encodeURIComponent( obj[ p ] ) );
                }
                return str.join( '&' );
            },
            data: data
        };

        return this.$http( options )
                   .then( ( response ) => {
                       this.$localStorage.token = response.data;
                       this.$localStorage.tokenClaims = this.user;

                       success( response );
                   }, error );

    }

    fetchUserInfo() {
        let userInfoUrl = `${this.identityServerUrl}connect/userinfo`;

        /**
         * Exemplo do objeto user retornado pelo IdentityServer do Acesso Cidadão
         * {
         *      celularValidado: "False"
         *      cpf: "05490226781"
         *      dateofbirth: "13/07/1984"
         *      emailaddress: "vizeke@gmail.com"
         *      homephone: "27 3636 7224"
         *      mobilephone: ""
         *      name: "Vinícius Salomão Barbosa"
         *      nomemae: "Dalgiza Salomão"
         *      nomepai: "Jair Barbosa"
         *      sid: "9239"
         * }
         */

        return this.$http.get( userInfoUrl ).then( ( response ) => {
            // Check if the object is correct (This request can return the Acesso Cidadão login page)
            if ( angular.isDefined( response.data.sid ) ) {
                this.$localStorage.userInfo = response.data;
            }
        } );
    }

    signIn( data ) {
        // Get Token
        return this.getToken( data, () => {
            // Fetch and save User Info
            this.fetchUserInfo();
        } );
    }

    /**
     * Faz logout do usuário. Remove o token do localstore e os claims salvos.
     */
    signOut( success ) {
        delete this.$localStorage.token;
        delete this.$localStorage.userInfo;
        delete this.$localStorage.tokenClaims;
        success();
    }
}

export default OAuth2;
