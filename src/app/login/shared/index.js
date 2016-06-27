import angular from 'angular';
import oAuth2Factory from './oAuth2Factory.service.js';
import oAuthDigits from './oAuthDigits.service.js';
import oAuthFacebook from './oAuthFacebook.service.js';
import oAuthGoogle from './oAuthGoogle.service.js';

export default angular
    .module( 'login.shared', [] )
    .service( 'OAuth2', oAuth2Factory )
    .service( 'OAuthDigits', oAuthDigits )
    .service( 'OAuthFacebook', oAuthFacebook )
    .service( 'OAuthGoogle', oAuthGoogle );
