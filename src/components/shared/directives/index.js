import onScrollDirectie from './on-scroll.directive.js';

export default angular.module( 'shared.directives', [ ] )
                      .directive( 'scrollWatch', onScrollDirectie );
