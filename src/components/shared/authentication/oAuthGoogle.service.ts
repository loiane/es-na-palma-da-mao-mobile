/**
 * https://github.com/EddyVerbruggen/cordova-plugin-googleplus
 */
class OAuthGoogle {

    public static $inject: string[] = [ '$window', '$localStorage' ];

    /**
     *
     */
    constructor( private $window, private $localStorage ) {
    }

    /**
     *
     */
    public login( options, success, error ) {
        /**
         * Exemplo de objeto retornado pelo google
         * {
         *      ageRangeMin: 21
         *      displayName: "Vinícius Salomão (ViZeke)"
         *      email: "vizeke@gmail.com"
         *      familyName: "Salomão"
         *      gender: "male"
         *      givenName: "Vinícius"
         *      imageUrl: "<url>"
         *      oauthToken: "<access token>"
         *      userId: "109899610867148451723"
         * }
         */
        this.$window.plugins.googleplus.login( options,
            ( responseGoogle ) => {
                // Salva o token do Google
                this.$localStorage.googleAccessToken = responseGoogle;

                success( responseGoogle );
            }, error );
    }

    public get avatarUrl() {
        if ( angular.isDefined( this.$localStorage.googleAccessToken ) ) {
            return this.$localStorage.googleAccessToken.imageUrl;
        }
    }

    public trySilentLogin( options, success, error ) {
        this.$window.plugins.googleplus.trySilentLogin( options, success, error );
    }

    public logout( cb ) {
        if ( this.$window.plugins && this.$window.plugins.googleplus ) {
            this.$window.plugins.googleplus.logout( cb );
        }
    }

    public disconnect( cb ) {
        this.$window.plugins.googleplus.disconnect( cb );
    }
}

export default OAuthGoogle;
