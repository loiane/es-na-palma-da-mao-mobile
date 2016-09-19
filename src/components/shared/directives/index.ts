import { scrollWach } from './scroll-watch.directive';
import { removeEmailValidation } from './remove-email-validation';
import { inputReturn } from './input-return.directive';

export default angular.module( 'shared.directives', [] )
                      .directive( 'scrollWatch', scrollWach )
                      .directive( 'removeEmailValidation', removeEmailValidation )
                      .directive( 'inputReturn', inputReturn );
