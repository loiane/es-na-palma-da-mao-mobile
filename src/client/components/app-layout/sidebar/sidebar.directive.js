import template from './sidebar.tpl.html!text';

export default function sidebarDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        template: template,
        scope: {
            visible: '=',
            showFooterControls: '=',
            showUserInfo: '=',
            appName: '=',
            userName: '='
        },
        replace: true
    };

    return directive;
}
