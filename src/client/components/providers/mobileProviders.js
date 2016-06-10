import angular from 'angular';
import oAuth2Factory from './oAuth2Factory.js';
import oAuthDigits from './oAuthDigits.js';
import oAuthFacebook from './oAuthFacebook.js';
import oAuthGoogle from './oAuthGoogle.js';

export default angular
        .module( 'mobileProviders', [] )
        .service( 'OAuth2', oAuth2Factory )
        .service( 'OAuthDigits', oAuthDigits )
        .service( 'OAuthFacebook', oAuthFacebook )
        .service( 'OAuthGoogle', oAuthGoogle );
