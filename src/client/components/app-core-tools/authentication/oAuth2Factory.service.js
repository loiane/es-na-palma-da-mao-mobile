/** Classe para acesso ao IdentityServer3 */
class OAuth2 {

    /** @constructor */
    constructor( $window, $http, $localStorage ) {
        this.$http = $http;
        this.$localStorage = $localStorage;
        this.$window = $window;

        this.$localStorage.tokenClaims = this.user;
    }

    initialize( identityServerUrl ) {
        this.identityServerUrl = identityServerUrl;
    }

    /**
     * Decodifica uma url Base64
     */
    _urlBase64Decode( str ) {
        var output = str.replace( '-', '+' ).replace( '_', '/' );
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
        if ( angular.isDefined(token) ) {
            let encoded = token.access_token.split( '.' )[ 1 ];
            user = angular.fromJson( this._urlBase64Decode( encoded ) );
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
    _getToken( data, success, error ) {
        let getTokenUrl = `${this.identityServerUrl}connect/token`;

        let options = {
            method: 'POST',
            url: getTokenUrl,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            transformRequest: function( obj ) {
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

    fetchUserInfo( ) {
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

        return this.$http.get( userInfoUrl );
    }

    isValidToken() {
        if ( !this.token ) {
            return false;
        }

        return true; //TODO: Remover assim que Tadeu verificar isso

        /*let options = {
            token: this.token
        };

        this.$http.post( `${this.identityServerUrl}connect/introspect`, options )
            .then( ( tokenClaims ) => {
                return true;
            }, ( error ) => {
                return false;
            } );*/
    }

    signIn( data ) {
        //Get Token
        return this._getToken( data, ( ) => {
            //Fetch and save User Info
            this.fetchUserInfo().then( ( response ) => {
                this.$localStorage.userInfo = response.data;
            } );
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

/**
 * @module OAuth2
 */
export default [ '$window', '$http', '$localStorage', OAuth2 ];
