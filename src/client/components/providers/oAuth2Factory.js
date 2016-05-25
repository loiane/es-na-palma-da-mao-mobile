
/** Classe para acesso ao IdentityServer3 */
class OAuth2 {

    /** @constructor */
    constructor( $window, $http, $localStorage ) {
        this.is3Url = 'http://localhost:5000/';

        this.$http = $http;
        this.$localStorage = $localStorage;
        this.$window = $window;

        this.tokenClaims = this._getClaimsFromToken();
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
    _getClaimsFromToken() {
        var token = this.$localStorage.token;

        var user = {};
        if ( typeof token !== 'undefined' ) {
            var encoded = token.access_token.split( '.' )[ 1 ];
            user = JSON.parse( this._urlBase64Decode( encoded ) );
        }
        return user;
    }

    _existeToken() {
        //TODO: Verificar como o token é retornado do $localStorage
        return this.$localStorage.token;
    }

    _token() {
        if ( !this._existeToken() )
            return '';

        return this.$localStorage.token;
    }

    /**
     * Faz a requisição de um token no IdentityServer3, a partir dos dados fornecidos.
     */
    getToken( data, success, error ) {
        var getTokenUrl = this.is3Url + 'connect/token';

        var options = {
            method: 'POST',
            url: urlIdentityServer,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            transformRequest: function( obj ) {
                var str = [];
                for ( var p in obj )
                    str.push( encodeURIComponent( p ) + '=' + encodeURIComponent( obj[ p ] ) );
                return str.join( '&' );
            },
            data: data
        };

        this.$http( options )
            .success( ( response ) => {
                this.$localStorage.token = response;
                this.tokenClaims = this._getClaimsFromToken();

                success( response );
            } )
            .error( error );

    }

    isValidToken() {
        if ( !this._existeToken() )
            return false;

        var options = {
            token: this._token()
        };

        $http.post( this.is3Url + 'connect/accesstokenvalidation', options )
            .then( ( tokenClaims ) => {
                return true;
            }, () => {
                return false;
            } );
    }

    /**
     * Faz logout do usuário. Remove o token do localstore e os claims salvos.
     */
    logOut( success ) {
        this.tokenClaims = {};
        delete $localStorage.token;
        success();
    }

    /**
     * @return {object} Claims do usuário
     */
    getTokenClaims() {
        return this.tokenClaims;
    }

    /*
    signUp( data, success, error ) {
        $http.post( this.urls.BASE + '/signup', data ).success( success ).error( error );
    }

    signIn( data, success, error ) {
        $http.post( this.urls.BASE + '/signin', data ).success( success ).error( error );
    }
    */
}

/**
 * @module OAuth2
 */
export default [ '$window', '$http', '$localStorage', OAuth2 ];
