import angular from 'angular';
import oAuth2Factory from './oAuth2Factory.service';
import oAuthDigits from './oAuthDigits.service';
import oAuthFacebook from './oAuthFacebook.service';
import oAuthGoogle from './oAuthGoogle.service';

export default angular
    .module( 'authentication.shared', [] )
    .service( 'OAuth2', oAuth2Factory )
    .service( 'OAuthDigits', oAuthDigits )
    .service( 'OAuthFacebook', oAuthFacebook )
    .service( 'OAuthGoogle', oAuthGoogle );
