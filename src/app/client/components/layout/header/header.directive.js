import template from './header.html!text';

export default function pageHeaderDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        template: template,
        scope: {
            visible:'='
        },
        replace:true
        // controller: PageHeaderDirectiveController,
        // controllerAs: 'vm',
        // bindToController: true
    };

    return directive;
}

// class PageHeaderDirectiveController {
//     constructor() {
//         'ngInject';
//     }
// }
