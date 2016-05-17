import angular from 'angular';
import oAuth2Factory from './oAuth2Factory.js';

export default angular
        .module( 'mobileProviders', [] )
        .service( 'OAuth2', oAuth2Factory );
