import angular from 'angular';
import {AcessoCidadaoService} from './acesso-cidadao.service';
import {DigitsService} from './digits.service';
import {FacebookService} from './facebook.service';
import {GoogleService} from './google.service';

export default angular
    .module( 'authentication.shared', [] )
    .service( 'acessoCidadaoService', AcessoCidadaoService )
    .service( 'digitsService', DigitsService )
    .service( 'facebookService', FacebookService )
    .service( 'googleService', GoogleService );

export * from './acesso-cidadao.service';
export * from './digits.service';
export * from './facebook.service';
export * from './google.service';
export * from './models/index';
