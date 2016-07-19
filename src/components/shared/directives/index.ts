import onScrollDirective from './on-scroll.directive';

export default angular.module( 'shared.directives', [] )
                      .directive( 'scrollWatch', onScrollDirective );
