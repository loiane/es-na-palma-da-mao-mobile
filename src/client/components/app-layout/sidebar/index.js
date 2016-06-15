import angular from 'angular';
import pageSidebarDirective from './sidebar.directive';
import './sidebar.css!';

export default angular.module( 'layout' ).directive( 'pdcSidebar', pageSidebarDirective );

