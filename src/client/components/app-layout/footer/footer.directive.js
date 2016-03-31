import template from './footer.tpl.html!text';

export default function pageFooterDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        template: template,
        replace: true,
        scope: {
            visible: '='
        }
    };

    return directive;
}

