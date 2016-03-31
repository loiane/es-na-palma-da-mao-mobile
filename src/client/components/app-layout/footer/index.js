import angular from 'angular';
import pageFooterDirective from './footer.directive';
import './footer.css!';

export default angular.module( 'layout' ).directive( 'pdcFooter', pageFooterDirective );
