import { ScrollWach } from './on-scroll.directive';
import { RemoveEmailValidation } from './remove-email-validation';

export default angular.module( 'shared.directives', [] )
                      .directive( 'scrollWatch', ScrollWach )
                      .directive( 'removeEmailValidation', RemoveEmailValidation );
