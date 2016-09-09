import { scrollWach } from './scroll-watch.directive';
import { removeEmailValidation } from './remove-email-validation';

export default angular.module( 'shared.directives', [] )
                      .directive( 'scrollWatch', scrollWach )
                      .directive( 'removeEmailValidation', removeEmailValidation );
