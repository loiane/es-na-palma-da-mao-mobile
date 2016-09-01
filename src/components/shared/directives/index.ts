import { ScrollWach } from './scroll-watch.directive';
import { RemoveEmailValidation } from './remove-email-validation';

export default angular.module( 'shared.directives', [] )
                      .directive( 'scrollWatch', ScrollWach )
                      .directive( 'removeEmailValidation', RemoveEmailValidation );
