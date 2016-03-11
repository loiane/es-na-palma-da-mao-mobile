import template from './footer.html!text';

export default function pageFooterDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        template: template,
        replace:true,
        scope: {
            visible:'='
        }//,
        // controller: PageFooterDirectiveController,
        // controllerAs: 'vm',
        // bindToController: true
    };

    return directive;
}
// 
// class PageFooterDirectiveController {
//     constructor() {
//         'ngInject';
//     }
// }
