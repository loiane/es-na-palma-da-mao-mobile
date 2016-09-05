import angular from 'angular';
import { AuthenticationService } from './authentication.service';
import { AcessoCidadaoService } from './acesso-cidadao.service';
import { FacebookService } from './facebook.service';
import { GoogleService } from './google.service';
import { DigitsService } from './digits.service';

export default angular
    .module( 'authentication.shared', [] )
    .service( 'acessoCidadaoService', AcessoCidadaoService )
    .service( 'facebookService', FacebookService )
    .service( 'googleService', GoogleService )
    .service( 'digitsService', DigitsService )
    .service( 'authenticationService', AuthenticationService );

export * from './acesso-cidadao.service';
export * from './digits.service';
export * from './facebook.service';
export * from './google.service';
export * from './models/index';
export * from './authentication.service';
