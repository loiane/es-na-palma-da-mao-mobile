import angular from 'angular';
import pageHeaderDirective from './header.directive';
import './header.css!';

export default angular.module( 'layout' ).directive( 'pdcHeader', pageHeaderDirective );
