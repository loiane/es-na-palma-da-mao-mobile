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
    };

    return directive;
}
